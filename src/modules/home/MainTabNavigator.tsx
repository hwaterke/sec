import {Ionicons} from '@expo/vector-icons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import {ExerciseNavigator} from '../exercises/ExerciseNavigator'
import {HistoryNavigator} from '../history/HistoryNavigator'
import {SettingsNavigator} from '../settings/SettingsNavigator'

const Tab = createBottomTabNavigator()

const mainTabNavigatorScreenOptions = {headerShown: false}

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={mainTabNavigatorScreenOptions}>
      <Tab.Screen
        name="ExerciseTab"
        component={ExerciseNavigator}
        options={{
          title: 'Exercises',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-list" size={26} style={{color}} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryNavigator}
        options={{
          title: 'History',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-calendar-outline" size={26} style={{color}} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          title: 'Settings',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-cog" size={26} style={{color}} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
