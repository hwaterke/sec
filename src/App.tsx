import React, {useState} from 'react'
import {SafeAreaView, Text} from 'react-native'
import {theme, Theme} from './theming/theme'
import {ThemeSetterContext} from './theming/ThemeSetterContext'
import {ThemeProvider} from 'styled-components'
import {NavigationContainer} from '@react-navigation/native'
import {MainStackNavigator} from './modules/home/MainStackNavigator'
import {isNil} from 'ramda'
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator'
import {db, expoDb} from './database/datasource'
import migrations from './database/drizzle/migrations'
// See https://github.com/expo/expo/issues/28618
import 'react-native-reanimated'
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin'

export const App = () => {
  const {success, error} = useMigrations(db, migrations)
  useDrizzleStudio(expoDb)
  const [activeTheme, setTheme] = useState<Theme>(theme)

  if (!isNil(error)) {
    return (
      <SafeAreaView>
        <Text>Migration error: {error.message}</Text>
      </SafeAreaView>
    )
  }

  if (!success) {
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
