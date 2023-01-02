import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {Alert, SafeAreaView, Text} from 'react-native'
import {ThemeProvider} from 'styled-components/native'
import {DATASOURCE} from './database/datasource'
import {MainStackNavigator} from './modules/home/MainStackNavigator'
import {theme, Theme} from './theming/theme'
import {ThemeSetterContext} from './theming/ThemeSetterContext'

export const App: React.FC = () => {
  const [databaseReady, setDatabaseReady] = useState(false)
  const [activeTheme, setTheme] = useState<Theme>(theme)

  useEffect(() => {
    const main = async () => {
      if (!DATASOURCE.isInitialized) {
        try {
          await DATASOURCE.initialize()
        } catch (err) {
          Alert.alert('Error', `${err}`)
        }
        setDatabaseReady(true)
      }
    }

    main()
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
