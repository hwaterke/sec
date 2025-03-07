import {NavigationContainer} from '@react-navigation/native'
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator'
import {isNil} from 'ramda'
import React, {useState} from 'react'
import {SafeAreaView, Text} from 'react-native'
import {ThemeProvider} from 'styled-components'
import {db, expoDb} from './database/datasource'
import migrations from './database/drizzle/migrations'
import {MainStackNavigator} from './modules/home/MainStackNavigator'
import {theme, Theme} from './theming/theme'
import {ThemeSetterContext} from './theming/ThemeSetterContext'
// See https://github.com/expo/expo/issues/28618
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin'
import 'react-native-reanimated'

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
