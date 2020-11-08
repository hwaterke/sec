import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {MainTabNavigator} from './MainTabNavigator'
import {WorkoutSetAddScreen} from '../workoutSet/WorkoutSetAddScreen'

export type MainStackNavigatorParamList = {
  Tabs: undefined
  WorkoutSetAddScreen: {
    exerciseUuid: string
  }
}

const Stack = createStackNavigator<MainStackNavigatorParamList>()

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WorkoutSetAddScreen"
        component={WorkoutSetAddScreen}
      />
    </Stack.Navigator>
  )
}
