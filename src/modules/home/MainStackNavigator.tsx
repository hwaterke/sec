import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {theme} from '../../theming/theme'
import {WorkoutSetAddScreen} from '../workoutSet/WorkoutSetAddScreen'
import {WorkoutSetEditScreen} from '../workoutSet/WorkoutSetEditScreen'
import {MainTabNavigator} from './MainTabNavigator'

export type MainStackNavigatorParamList = {
  Tabs: undefined
  WorkoutSetAddScreen: {
    exerciseId: string
    repetitions?: number
    weight?: number
    distance?: number
    time?: string
    notes?: string
  }
  WorkoutSetEditScreen: {
    workoutSetId: string
  }
}

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>()

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
      <Stack.Screen
        name="WorkoutSetEditScreen"
        component={WorkoutSetEditScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background.editing,
          },
        }}
      />
    </Stack.Navigator>
  )
}
