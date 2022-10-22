import {ConfigService} from '@nestjs/config'
import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import {ENTITIES} from './entities'
import {nodeEnv} from './env'

const devDatabaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './dev.db',
  entities: ENTITIES,
  logging: true,
  synchronize: true,
}

const testDatabaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: ENTITIES,
  logging: false,
  synchronize: true,
}

export const getDatabaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => {
  switch (nodeEnv()) {
    case 'development':
      return devDatabaseConfig
    case 'test':
      return testDatabaseConfig
    case 'production': {
      const databaseUrl = configService.get<string>('DATABASE_URL')
      if (databaseUrl) {
        return {
          type: 'postgres',
          url: databaseUrl,
          entities: ENTITIES,
          logging: false,
          synchronize: false,
          migrationsRun: true,
          migrations: ['dist/database/migrations/*.{ts,js}'],
        }
      }

      return {
        type: 'sqlite',
        database: configService.get<string>('DB_PATH', './sec.db'),
        entities: ENTITIES,
        logging: false,
        synchronize: false,
        migrationsRun: true,
        migrations: ['dist/database/migrations/*.{ts,js}'],
      }
    }
  }
}
