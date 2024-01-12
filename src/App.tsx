import React, {useEffect, useState} from 'react'
import {SafeAreaView, Text} from 'react-native'
import {theme, Theme} from './theming/theme'
import {ThemeSetterContext} from './theming/ThemeSetterContext'
import {ThemeProvider} from 'styled-components'
import {NavigationContainer} from '@react-navigation/native'
import {MainStackNavigator} from './modules/home/MainStackNavigator'
import {DatabaseService} from './database/database-service'
import {knex} from './database/datasource'

export const App = () => {
  const [databaseReady, setDatabaseReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTheme, setTheme] = useState<Theme>(theme)

  useEffect(() => {
    const main = async () => {
      // TODO Remove
      // await knex.schema.dropTableIfExists(MIGRATION_TABLE_NAME)
      // await knex.schema.dropTableIfExists('exercise')
      // await knex.schema.dropTableIfExists('workout_set')

      try {
        await DatabaseService.runMigrations()
      } catch (error) {
        setError(`Error running migrations: ${error}`)
      }
      setDatabaseReady(true)
    }

    main()

    return () => {
      knex.destroy()
    }
  }, [])

  if (!databaseReady) {
    return (
      <SafeAreaView>
        <Text>Database not ready</Text>
      </SafeAreaView>
    )
  }

  return (
    <ThemeSetterContext.Provider value={setTheme}>
      <ThemeProvider theme={activeTheme}>
        <NavigationContainer theme={activeTheme.navigation}>
          <MainStackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </ThemeSetterContext.Provider>
  )
}
