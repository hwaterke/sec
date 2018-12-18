import {Ionicons} from '@expo/vector-icons'
/* eslint-disable react/display-name,react/prop-types */
import React from 'react'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {colors} from '../constants/colors'
import {globalStyles} from '../constants/styles'
import {ExercisesNavigation} from './exercises/ExercisesNavigation'
import {SettingsScreen} from './SettingsScreen'
import {WorkoutSetsNavigation} from './workout_sets/WorkoutSetsNavigation'

ExercisesNavigation.navigationOptions = {
  tabBarLabel: 'Exercises',
  tabBarIcon: ({tintColor}) => (
    <Ionicons name="ios-list-box" size={26} style={{color: tintColor}} />
  ),
}

WorkoutSetsNavigation.navigationOptions = {
  tabBarLabel: 'Set',
  tabBarIcon: ({tintColor}) => (
    <Ionicons name="ios-add" size={26} style={{color: tintColor}} />
  ),
}

const SettingStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      headerStyle: globalStyles.header,
      headerTintColor: colors.headerTintColor,
    },
  },
})

SettingStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({tintColor}) => (
    <Ionicons name="ios-settings" size={26} style={{color: tintColor}} />
  ),
}

export const SecTabNavigator = createBottomTabNavigator(
  {
    Exercises: {
      screen: ExercisesNavigation,
    },
    Sets: {
      screen: WorkoutSetsNavigation,
    },
    Settings: {
      screen: SettingStack,
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.headerColor,
    },
  }
)
