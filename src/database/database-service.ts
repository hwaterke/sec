import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import {DATABASE_NAME} from './constants'
import {isNil} from 'ramda'

const databaseFolder = () => {
  return `${FileSystem.documentDirectory}SQLite`
}

const databaseFile = () => {
  return `${databaseFolder()}/${DATABASE_NAME}`
}

export const DatabaseService = {
  importDatabase: async (): Promise<void> => {
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
  },

  exportDatabase: (): Promise<void> => {
    return Sharing.shareAsync(databaseFile())
  },

  resetDatabase: async (): Promise<void> => {
    await FileSystem.deleteAsync(databaseFile())
  },
}
