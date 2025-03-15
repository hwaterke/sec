import {NavigationContainer} from '@react-navigation/native'
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator'
import React from 'react'
import {SafeAreaView, Text} from 'react-native'
import 'react-native-reanimated'
import {db, expoDb} from './database/datasource'
import migrations from './database/drizzle/migrations'
import {MainStackNavigator} from './modules/home/MainStackNavigator'
import {theme} from './theming/theme'
// See https://github.com/expo/expo/issues/28618
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin'
import {isNullish} from 'remeda'
import './global.css'

export const App = () => {
  const {success, error} = useMigrations(db, migrations)
  useDrizzleStudio(expoDb)

  if (!isNullish(error)) {
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
    <NavigationContainer theme={theme.navigation}>
      <MainStackNavigator />
    </NavigationContainer>
  )
}
