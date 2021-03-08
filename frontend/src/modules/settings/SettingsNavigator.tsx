import React, {useContext} from 'react'
import {Button, Switch, Text, View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {useDispatch} from 'react-redux'
import {clearToken} from '../../redux/reducers/tokenReducer'
import {ThemeContext} from 'styled-components/native'
import {darkTheme, theme} from '../../theming/theme'
import {ThemeSetterContext} from '../../theming/ThemeSetterContext'

const Stack = createStackNavigator()

export const SettingsHome = () => {
  const dispatch = useDispatch()
  const setTheme = useContext(ThemeSetterContext)
  const activeTheme = useContext(ThemeContext)

  return (
    <View>
      <Button onPress={() => dispatch(clearToken())} title="Clear token" />

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
