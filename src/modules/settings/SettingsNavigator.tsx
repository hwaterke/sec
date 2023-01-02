import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {Switch} from 'react-native'
import {ThemeContext} from 'styled-components/native'
import {Button} from '../../components/Button'
import {Text} from '../../components/Text'
import {DatabaseService} from '../../database/database-service'
import {Screen} from '../../design/layout/Screen'
import {globalScreenOptions} from '../../theming/globalScreenOption'
import {darkTheme, theme} from '../../theming/theme'
import {ThemeSetterContext} from '../../theming/ThemeSetterContext'

const Stack = createStackNavigator()

export const SettingsHome = () => {
  const setTheme = useContext(ThemeSetterContext)
  const activeTheme = useContext(ThemeContext)

  return (
    <Screen withPadding>
      <Text>Dark theme:</Text>
      <Switch
        value={activeTheme === darkTheme}
        onValueChange={() => {
          if (activeTheme === darkTheme) {
            setTheme?.(theme)
          } else {
            setTheme?.(darkTheme)
          }
        }}
      />

      <Button onPress={() => DatabaseService.exportDatabase()}>
        Export database
      </Button>
      <Button onPress={() => DatabaseService.importDatabase()}>
        Import database
      </Button>
      <Button onPress={() => DatabaseService.resetDatabase()}>
        Reset database
      </Button>
    </Screen>
  )
}

export const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsHome}
        options={{title: 'Settings'}}
      />
    </Stack.Navigator>
  )
}
