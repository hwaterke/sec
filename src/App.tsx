import React, {useEffect, useState} from 'react'
import {SafeAreaView, Text} from 'react-native'
import {theme, Theme} from './theming/theme'
import {ThemeSetterContext} from './theming/ThemeSetterContext'
import {ThemeProvider} from 'styled-components'
import {NavigationContainer} from '@react-navigation/native'
import {MainStackNavigator} from './modules/home/MainStackNavigator'
import {DatabaseService} from './database/database-service'
import {knex} from './database/datasource'
import {isNil} from 'ramda'
// See https://github.com/expo/expo/issues/28618
import 'react-native-reanimated'

export const App = () => {
  const [databaseReady, setDatabaseReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTheme, setTheme] = useState<Theme>(theme)

  useEffect(() => {
    const main = async () => {
      try {
        await DatabaseService.runMigrations()
      } catch (error) {
        setError(`Error running migrations: ${error}`)
      }
      setDatabaseReady(true)
    }

    void main()

    return () => {
      void knex.destroy()
    }
  }, [])

  if (!databaseReady) {
    return (
      <SafeAreaView>
        <Text>Database not ready</Text>
      </SafeAreaView>
    )
  }

  if (!isNil(error)) {
    return (
      <SafeAreaView>
        <Text>{error}</Text>
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
