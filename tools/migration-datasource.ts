import 'reflect-metadata'
import {DataSource} from 'typeorm'
import {ENTITIES} from '../src/database/entities'
import {MIGRATIONS} from '../src/database/migrations'

// This datasource is used to generate migrations
export const MigrationDataSource = new DataSource({
  type: 'sqlite',
  database: 'migrations.db',
  logging: true,
  entities: ENTITIES,
  migrations: MIGRATIONS,
  migrationsRun: true,
})
