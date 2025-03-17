import {Ionicons} from '@expo/vector-icons'
import {Stack, useRouter} from 'expo-router'
import React from 'react'
import {TouchableOpacity} from 'react-native'
import {theme} from '../../../theming/theme'

export default function ExercisesLayout() {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Exercises',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.navigate('/exercises/add')
              }}
            >
              <Ionicons name="add" size={24} color={theme.colors.text.link} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="exercises/[exerciseid]/index"
        options={{
          title: 'Exercise',
        }}
      />
      <Stack.Screen
        name="exercises/[exerciseid]/edit"
        options={{
          title: 'Edit Exercise',
          headerStyle: {
            backgroundColor: theme.colors.background.editing,
          },
        }}
      />
      <Stack.Screen name="add" options={{title: 'New Exercise'}} />
    </Stack>
  )
}
