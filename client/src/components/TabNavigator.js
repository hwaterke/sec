import React from 'react';
import {TabNavigator} from 'react-navigation';
import {SettingsScreen} from './SettingsScreen';
import {Ionicons} from 'react-native-vector-icons';
import {ExercisesNavigation} from './exercises/ExercisesNavigation';
import {WorkoutSetsNavigation} from './workout_sets/WorkoutSetsNavigation';
import {colors} from '../constants/colors';
import {SummaryNavigator} from './summary/SummaryNavigator';
import {MusclesListScreen} from './muscles/MusclesListScreen';

MusclesListScreen.navigationOptions = {
  tabBar: {
    label: 'Muscles',
    icon: ({tintColor, focused}) => (
      <Ionicons
        name={focused ? 'ios-body' : 'ios-body-outline'}
        size={26}
        style={{color: tintColor}}
      />
    ),
  },
};

ExercisesNavigation.navigationOptions = {
  tabBar: {
    label: 'Exercises',
    icon: ({tintColor, focused}) => (
      <Ionicons
        name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
        size={26}
        style={{color: tintColor}}
      />
    ),
  },
};

WorkoutSetsNavigation.navigationOptions = {
  tabBar: {
    label: 'Set',
    icon: ({tintColor, focused}) => (
      <Ionicons
        name={focused ? 'ios-add' : 'ios-add-outline'}
        size={26}
        style={{color: tintColor}}
      />
    ),
  },
};

SummaryNavigator.navigationOptions = {
  tabBar: {
    label: 'History',
    icon: ({tintColor, focused}) => (
      <Ionicons
        name={focused ? 'ios-book' : 'ios-book-outline'}
        size={26}
        style={{color: tintColor}}
      />
    ),
  },
};

SettingsScreen.navigationOptions = {
  tabBar: {
    label: 'Settings',
    icon: ({tintColor, focused}) => (
      <Ionicons
        name={focused ? 'ios-settings' : 'ios-settings-outline'}
        size={26}
        style={{color: tintColor}}
      />
    ),
  },
};

export const SecTabNavigator = TabNavigator({
  Muscles: {
    screen: MusclesListScreen
  },
  Exercises: {
    screen: ExercisesNavigation
  },
  Sets: {
    screen: WorkoutSetsNavigation
  },
  Summary: {
    screen: SummaryNavigator
  },
  Settings: {
    screen: SettingsScreen
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.tintColor,
  },
});
