import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {useContext} from 'react'
import {Switch, View} from 'react-native'
import {ThemeContext} from 'styled-components/native'
import {Button} from '../../components/Button'
import {Label, Text} from '../../components/Text'
import {DatabaseService} from '../../database/database-service'
import {Screen} from '../../design/layout/Screen'
import {darkTheme, theme} from '../../theming/theme'
import {ThemeSetterContext} from '../../theming/ThemeSetterContext'

const Stack = createNativeStackNavigator()

export const SettingsHome = () => {
  const setTheme = useContext(ThemeSetterContext)
  const activeTheme = useContext(ThemeContext)

  return (
    <View className="flex-1 bg-light-bg p-6">
      <View className="m-4 flex-row items-center justify-between">
        <Label>Dark theme</Label>
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
      </View>

      <View className="gap-2">
        <Button onPress={() => DatabaseService.exportDatabase()}>
          Export database
        </Button>
        <Button onPress={() => DatabaseService.importDatabase()}>
          Import database
        </Button>
        <Button onPress={() => DatabaseService.resetDatabase()}>
          Reset database
        </Button>
      </View>
    </View>
  )
}

export const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsHome}
        options={{title: 'Settings'}}
      />
    </Stack.Navigator>
  )
}
