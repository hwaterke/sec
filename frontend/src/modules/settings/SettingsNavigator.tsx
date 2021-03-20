import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {Switch} from 'react-native'
import {useDispatch} from 'react-redux'
import {ThemeContext} from 'styled-components/native'
import {Button} from '../../components/Button'
import {Text} from '../../components/Text'
import {Screen} from '../../design/layout/Screen'
import {clearToken} from '../../redux/reducers/tokenReducer'
import {globalScreenOptions} from '../../theming/globalScreenOption'
import {darkTheme, theme} from '../../theming/theme'
import {ThemeSetterContext} from '../../theming/ThemeSetterContext'

const Stack = createStackNavigator()

export const SettingsHome = () => {
  const dispatch = useDispatch()
  const setTheme = useContext(ThemeSetterContext)
  const activeTheme = useContext(ThemeContext)

  return (
    <Screen withPadding>
      <Button onPress={() => dispatch(clearToken())}>Logout</Button>

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
