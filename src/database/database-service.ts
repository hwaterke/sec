import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import {DATABASE_NAME, MIGRATION_TABLE_NAME} from './constants'
import {isNil} from 'ramda'
import {knex} from './datasource'
import {MIGRATIONS} from './migrations'

const databaseFolder = () => {
  return FileSystem.documentDirectory + 'SQLite'
}

const databaseFile = () => {
  return `${databaseFolder()}/${DATABASE_NAME}`
}

export const DatabaseService = {
  runMigrations: async (): Promise<void> => {
    const hasMigrationTable = await knex.schema.hasTable(MIGRATION_TABLE_NAME)

    if (!hasMigrationTable) {
      await knex.schema.createTable(MIGRATION_TABLE_NAME, (table) => {
        table.string('name').primary()
        table.datetime('created_at').defaultTo(knex.fn.now())
      })
    }

    // Execute missing migrations
    for (const migration of MIGRATIONS) {
      const migrationRun = await knex(MIGRATION_TABLE_NAME)
        .where({name: migration.name})
        .first()

      if (isNil(migrationRun)) {
        await migration.up(knex)
        await knex(MIGRATION_TABLE_NAME).insert({name: migration.name})
      }
    }
  },

  importDatabase: async (): Promise<void> => {
    // Close the current database
    await knex.destroy()

    // Import file
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    })

    if (!isNil(file.assets) && file.assets.length > 0) {
      if (!(await FileSystem.getInfoAsync(databaseFolder())).exists) {
        await FileSystem.makeDirectoryAsync(databaseFolder())
      }
      await FileSystem.copyAsync({
        from: file.assets[0].uri,
        to: databaseFile(),
      })
    }

    // Restart the datasource
    knex.initialize()
  },

  exportDatabase: (): Promise<void> => {
    return Sharing.shareAsync(databaseFile())
  },

  resetDatabase: async (): Promise<void> => {
    // Close the current database
    await knex.destroy()
    await FileSystem.deleteAsync(databaseFile())
    knex.initialize()
  },
}
