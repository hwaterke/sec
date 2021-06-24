#!/usr/bin/env bash

set -ex

MIGRATION_NAME=${1?Please provide a name for the migration (start with a capital)}

echo "Generating new migration"
rm migrations.db || true

echo "Running existing migrations"
yarn typeorm migration:run --config scripts/migrations/create-migration.json

echo "Creating new migration"
yarn typeorm migration:generate --config scripts/migrations/create-migration.json --name ${MIGRATION_NAME}Migration

echo "Done. Deleting database"
rm migrations.db || true
