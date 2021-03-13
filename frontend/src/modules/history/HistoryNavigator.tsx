import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {HistoryScreen} from './HistoryScreen'
import {HistoryDayScreen} from './HistoryDayScreen'
import {HistoryStackParamList} from './types'

const Stack = createStackNavigator<HistoryStackParamList>()

export const HistoryNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="HistoryDayScreen" component={HistoryDayScreen} />
    </Stack.Navigator>
  )
}
