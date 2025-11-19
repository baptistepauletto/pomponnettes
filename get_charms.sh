#!/bin/bash

# get_charms.sh
# Usage: ./get_charms.sh <charm_number>
# Example: ./get_charms.sh 1

if [ -z "$1" ]; then
  echo "Usage: $0 <charm_number>"
  exit 1
fi

CHARM_NUM=$1
TAXONOMY="pa_charm-${CHARM_NUM}"
WP_CMD="wp --allow-root"
OUTPUT_FILE="charm-${CHARM_NUM}-slugs.txt"

# Check if taxonomy exists
if ! $WP_CMD taxonomy list --field=name | grep -q "^${TAXONOMY}$"; then
  echo "Error: Taxonomy ${TAXONOMY} does not exist."
  exit 1
fi

# List terms (slugs) to file
$WP_CMD term list "$TAXONOMY" --field=slug > "$OUTPUT_FILE"

echo "✅ Slugs saved to $OUTPUT_FILE"
echo "Total count: $(wc -l < "$OUTPUT_FILE")"
