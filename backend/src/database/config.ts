import {ConnectionOptions} from 'typeorm'
import {DATABASE_ENTITIES} from './entities'

const configs: {[env: string]: ConnectionOptions} = {
  development: {
    type: 'sqlite',
    database: './dev.db',
    entities: DATABASE_ENTITIES,
    logging: true,
    synchronize: true,
  },
  test: {
    type: 'sqlite',
    database: ':memory:',
    entities: DATABASE_ENTITIES,
    logging: false,
    synchronize: true,
  },
  production: {
    type: 'sqlite',
    database: './sec.db',
    entities: DATABASE_ENTITIES,
    logging: false,
    synchronize: false,
    migrationsRun: true,
    migrations: [__dirname + '/migrations/*Migration{.js,.ts}'],
  },
}

export const databaseConfig = configs[process.env.NODE_ENV || 'development']
