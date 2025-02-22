import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {MainTabNavigator} from './MainTabNavigator'
import {WorkoutSetAddScreen} from '../workoutSet/WorkoutSetAddScreen'
import {WorkoutSetEditScreen} from '../workoutSet/WorkoutSetEditScreen'
import {useTheme} from 'styled-components'

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
  const theme = useTheme()

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
