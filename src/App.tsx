import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {Text} from 'react-native'
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
        console.log('DATASOURCE.initialize')
        await DATASOURCE.initialize()
        setDatabaseReady(true)
        console.log('DATASOURCE.initialized')
      }
    }

    main()
  }, [])

  if (!databaseReady) {
    return <Text>Database not ready</Text>
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
