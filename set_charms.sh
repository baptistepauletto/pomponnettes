#!/bin/bash

# set_charms.sh
# Usage: ./set_charms.sh <charm_number> <file_path>
# Example: ./set_charms.sh 1 charm-1-slugs.txt

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <charm_number> <file_path>"
    exit 1
fi

CHARM_NUM=$1
INPUT_FILE=$2
TAXONOMY="pa_charm-${CHARM_NUM}"
WP_CMD="wp --allow-root"

if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: File $INPUT_FILE not found."
    exit 1
fi

# Encode file content to Base64 to safely pass to PHP (avoid quote/space issues)
B64_CONTENT=$(base64 < "$INPUT_FILE" | tr -d '\n')

# PHP script to sync
PHP_SCRIPT=$(cat <<EOF
\$tax = "$TAXONOMY";
\$b64 = "$B64_CONTENT";

// Decode and parse file content
\$raw = base64_decode(\$b64);
// Split by newlines, trim. Use custom filter to preserve "0" which is falsey in PHP
\$lines = array_map('trim', preg_split('/\r\n|\r|\n/', \$raw));
\$desired_slugs = array_values(array_filter(\$lines, function(\$v) {
    return \$v !== null && \$v !== '';
}));

if (!taxonomy_exists(\$tax)) {
    WP_CLI::error("Taxonomy \$tax does not exist.");
}

// Get current terms
\$current_terms = get_terms([
    'taxonomy' => \$tax,
    'hide_empty' => false,
    'fields' => 'id=>slug',
]);
\$current_slugs = array_values(\$current_terms);

// Calculate differences
\$to_add = array_diff(\$desired_slugs, \$current_slugs);
\$to_delete = array_diff(\$current_slugs, \$desired_slugs);

if (empty(\$to_add) && empty(\$to_delete)) {
    WP_CLI::success("No changes needed for \$tax.");
    exit;
}

WP_CLI::line("Syncing \$tax from file...");

// DELETE
if (!empty(\$to_delete)) {
    WP_CLI::line("   Deleting " . count(\$to_delete) . " terms...");
    foreach (\$to_delete as \$slug) {
        \$term = get_term_by('slug', \$slug, \$tax);
        if (\$term) wp_delete_term(\$term->term_id, \$tax);
    }
}

// ADD
if (!empty(\$to_add)) {
    WP_CLI::line("   Adding " . count(\$to_add) . " terms...");
    foreach (\$to_add as \$slug) {
        // Use slug as name (capitalized) since we only have slug
        \$name = ucfirst(\$slug);
        wp_insert_term(\$name, \$tax, ['slug' => \$slug]);
    }
}

WP_CLI::success("Update complete.");
EOF
)

$WP_CMD eval "$PHP_SCRIPT"
