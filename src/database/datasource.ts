import {DATABASE_NAME} from './constants'
import Knex from 'knex'
import ExpoSQLiteDialect from '@expo/knex-expo-sqlite-dialect'

export const knex = Knex({
  client: ExpoSQLiteDialect,
  connection: {
    filename: DATABASE_NAME,
  },
  useNullAsDefault: true,
})
