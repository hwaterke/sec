#!/usr/bin/env bash
set -e

if [ $# -eq 0 ]; then
    echo "No arguments provided. Please provide a name for the migration."
    exit 1
fi

# Remove migration database
rm migrations.db || true

echo "Running existing migrations"
npx typeorm-ts-node-commonjs migration:run -d tools/migration-datasource.ts

echo "Generating new migration"
npx typeorm-ts-node-commonjs migration:generate -d tools/migration-datasource.ts "src/database/migrations/$1"

# Remove migration database
rm migrations.db || true

echo "Do not forget to add the migration to src/database/migrations.ts"
