import {Ionicons} from '@expo/vector-icons';
/* eslint-disable react/display-name,react/prop-types */
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {colors} from '../constants/colors';
import {ExercisesNavigation} from './exercises/ExercisesNavigation';
import {SettingsScreen} from './SettingsScreen';
import {WorkoutSetsNavigation} from './workout_sets/WorkoutSetsNavigation';

ExercisesNavigation.navigationOptions = {
  tabBarLabel: 'Exercises',
  tabBarIcon: ({tintColor, focused}) => (
    <Ionicons
      name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
      size={26}
      style={{color: tintColor}}
    />
  )
};

WorkoutSetsNavigation.navigationOptions = {
  tabBarLabel: 'Set',
  tabBarIcon: ({tintColor, focused}) => (
    <Ionicons
      name={focused ? 'ios-add' : 'ios-add-outline'}
      size={26}
      style={{color: tintColor}}
    />
  )
};

SettingsScreen.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({tintColor, focused}) => (
    <Ionicons
      name={focused ? 'ios-settings' : 'ios-settings-outline'}
      size={26}
      style={{color: tintColor}}
    />
  )
};

export const SecTabNavigator = createBottomTabNavigator(
  {
    Exercises: {
      screen: ExercisesNavigation
    },
    Sets: {
      screen: WorkoutSetsNavigation
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.headerColor
    }
  }
);
