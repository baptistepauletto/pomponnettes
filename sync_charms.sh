#!/bin/bash

# sync_charms.sh
# Usage: ./sync_charms.sh <source_num> <start_target_num> <end_target_num>
# Example: ./sync_charms.sh 1 2 7 (Syncs Charm 1 to Charm 2, 3, 4, 5, 6, 7)

if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <source_num> <start_target_num> <end_target_num>"
    exit 1
fi

SRC_NUM=$1
START_NUM=$2
END_NUM=$3

echo "---------------------------------------------------"
echo "SYNCING CHARMS (Strict Mode)"
echo "Source:  Charm $SRC_NUM"
echo "Targets: Charm $START_NUM to $END_NUM"
echo "---------------------------------------------------"
echo "⚠️  WARNING: Terms in targets NOT present in Source WILL BE DELETED."
# Prompt removed as requested


# The PHP script to run inside WordPress
PHP_SCRIPT=$(cat <<EOF
\$src_num = $SRC_NUM;
\$start = $START_NUM;
\$end = $END_NUM;
\$src_tax = "pa_charm-" . \$src_num;

// 1. Validate Source
if (!taxonomy_exists(\$src_tax)) {
    WP_CLI::error("Source taxonomy \$src_tax does not exist.");
}

// 2. Get Source Terms
\$src_terms = get_terms([
    'taxonomy'   => \$src_tax,
    'hide_empty' => false,
    'fields'     => 'id=>slug', // Map ID => Slug
]);
// We need a map of slug => name for recreation
\$src_slug_name_map = [];
foreach (get_terms(['taxonomy' => \$src_tax, 'hide_empty' => false]) as \$t) {
    \$src_slug_name_map[\$t->slug] = \$t->name;
}
\$src_slugs = array_values(\$src_terms);

WP_CLI::line("Source (\$src_tax) has " . count(\$src_slugs) . " terms.");

// 3. Loop Targets
for (\$i = \$start; \$i <= \$end; \$i++) {
    \$target_tax = "pa_charm-" . \$i;

    // Ensure target attribute exists
    if (!taxonomy_exists(\$target_tax)) {
        WP_CLI::line("Creating attribute: Charm \$i...");
        wc_create_attribute([
            'name'         => "Charm \$i",
            'slug'         => "charm-\$i",
            'type'         => 'select',
            'order_by'     => 'name',
            'has_archives' => false,
        ]);
        register_taxonomy(\$target_tax, ['product']); 
    }

    // Get Target Terms
    \$target_terms = get_terms([
        'taxonomy'   => \$target_tax,
        'hide_empty' => false,
        'fields'     => 'id=>slug',
    ]);
    \$target_slugs = array_values(\$target_terms);

    // 4. Calculate Diff
    \$to_add = array_diff(\$src_slugs, \$target_slugs);
    \$to_delete = array_diff(\$target_slugs, \$src_slugs);

    if (empty(\$to_add) && empty(\$to_delete)) {
        WP_CLI::line("✅ \$target_tax is already in sync.");
        continue;
    }

    WP_CLI::line("🔄 Syncing \$target_tax...");

    // DELETE
    if (!empty(\$to_delete)) {
        WP_CLI::line("   Deleting " . count(\$to_delete) . " terms...");
        foreach (\$to_delete as \$slug) {
            // Find term ID by slug in target
            \$term = get_term_by('slug', \$slug, \$target_tax);
            if (\$term) {
                wp_delete_term(\$term->term_id, \$target_tax);
            }
        }
    }

    // ADD
    if (!empty(\$to_add)) {
        WP_CLI::line("   Adding " . count(\$to_add) . " terms...");
        foreach (\$to_add as \$slug) {
            \$name = \$src_slug_name_map[\$slug] ?? \$slug;
            wp_insert_term(\$name, \$target_tax, ['slug' => \$slug]);
        }
    }
}
WP_CLI::success("Sync complete!");
EOF
)

# Run via WP-CLI
wp --allow-root eval "$PHP_SCRIPT"

