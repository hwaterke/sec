/* eslint-disable react/display-name,react/prop-types */
import React from 'react';
import {TabNavigator} from 'react-navigation';
import {SettingsScreen} from './SettingsScreen';
import {Ionicons} from '@expo/vector-icons';
import {ExercisesNavigation} from './exercises/ExercisesNavigation';
import {WorkoutSetsNavigation} from './workout_sets/WorkoutSetsNavigation';
import {colors} from '../constants/colors';

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

export const SecTabNavigator = TabNavigator(
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
