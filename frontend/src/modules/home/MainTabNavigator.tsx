import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {SettingsNavigator} from '../settings/SettingsNavigator'
import {ExerciseNavigator} from '../exercises/ExerciseNavigator'
import {Ionicons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ExerciseTab"
        component={ExerciseNavigator}
        options={{
          title: 'Exercises',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-list-box" size={26} style={{color}} />
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
