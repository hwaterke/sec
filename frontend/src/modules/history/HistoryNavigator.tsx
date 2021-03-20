import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {Button} from 'react-native'
import {globalScreenOptions} from '../../theming/globalScreenOption'
import {HistoryDayScreen} from './HistoryDayScreen'
import {HistoryScreen} from './HistoryScreen'
import {
  HistoryDayScreenNavigationProp,
  HistoryDayScreenRouteProp,
  HistoryStackParamList,
} from './types'

const Stack = createStackNavigator<HistoryStackParamList>()

export const HistoryNavigator = () => {
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen
        name="HistoryDayScreen"
        component={HistoryDayScreen}
        options={({
          navigation,
          route,
        }: {
          navigation: HistoryDayScreenNavigationProp
          route: HistoryDayScreenRouteProp
        }) => ({
          title: route.params.date,
          headerRight: () => (
            <Button
              title={route.params.isEditing ? 'Done' : 'Edit'}
              onPress={() => {
                navigation.setParams({
                  isEditing: !route.params.isEditing,
                })
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}
