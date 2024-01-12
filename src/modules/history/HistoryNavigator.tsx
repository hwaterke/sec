import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {TextButton} from '../../components/TextButton'
import {HistoryDayScreen} from './HistoryDayScreen'
import {HistoryScreen} from './HistoryScreen'
import {
  HistoryDayScreenNavigationProp,
  HistoryDayScreenRouteProp,
  HistoryStackParamList,
} from './types'

const Stack = createNativeStackNavigator<HistoryStackParamList>()

export const HistoryNavigator = () => {
  return (
    <Stack.Navigator>
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
            <TextButton
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
