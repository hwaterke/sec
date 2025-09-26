import 'react-native-reanimated'
import {ThemeProvider} from '@react-navigation/native'
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator'
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin'
import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import {Text} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {isNullish} from 'remeda'
import {db, expoDb} from '../database/datasource'
import migrations from '../database/drizzle/migrations'
import {theme} from '../theming/theme'
import '../global.css'

export default function RootLayout() {
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
    <ThemeProvider value={theme.navigation}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="workout-set/[exerciseid]/add" />
        <Stack.Screen
          name="workout-set/[id]/edit"
          options={{
            headerStyle: {
              backgroundColor: theme.colors.background.editing,
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
