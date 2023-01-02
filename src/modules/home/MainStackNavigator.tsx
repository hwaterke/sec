import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {globalScreenOptions} from '../../theming/globalScreenOption'
import {WorkoutSetAddScreen} from '../workoutSet/WorkoutSetAddScreen'
import {WorkoutSetEditScreen} from '../workoutSet/WorkoutSetEditScreen'
import {MainTabNavigator} from './MainTabNavigator'

export type MainStackNavigatorParamList = {
  Tabs: undefined
  WorkoutSetAddScreen: {
    exerciseUuid: string
    repetitions?: number
    weight?: number
    distance?: number
    time?: string
  }
  WorkoutSetEditScreen: {
    workoutSetUuid: string
  }
}

const Stack = createStackNavigator<MainStackNavigatorParamList>()

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="Tabs"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WorkoutSetAddScreen"
        component={WorkoutSetAddScreen}
      />
      <Stack.Screen
        name="WorkoutSetEditScreen"
        component={WorkoutSetEditScreen}
      />
    </Stack.Navigator>
  )
}
