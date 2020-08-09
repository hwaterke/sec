import React from 'react'
import {Button, View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {useDispatch} from 'react-redux'
import {clearToken} from '../../redux/reducers/tokenReducer'

const Stack = createStackNavigator()

export const SettingsHome = () => {
  const dispatch = useDispatch()

  return (
    <View>
      <Button onPress={() => dispatch(clearToken())} title="Clear token" />
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
