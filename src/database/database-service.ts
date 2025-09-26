import * as DocumentPicker from 'expo-document-picker'
import {File, Directory, Paths} from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import {DATABASE_NAME} from './constants'
import {isNullish} from 'remeda'

const databaseFolder = () => {
  return new Directory(Paths.document, 'SQLite')
}

const databaseFile = () => {
  return new File(databaseFolder(), DATABASE_NAME)
}

export const DatabaseService = {
  importDatabase: async (): Promise<void> => {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    })

    if (!isNullish(file.assets) && file.assets.length > 0) {
      if (!databaseFolder().exists) {
        databaseFolder().create()
      }
      const sourceFile = new File(file.assets[0].uri)
      sourceFile.copy(databaseFile())
    }
  },

  exportDatabase: (): Promise<void> => {
    return Sharing.shareAsync(databaseFile().uri)
  },

  resetDatabase: () => databaseFile().delete(),
}
