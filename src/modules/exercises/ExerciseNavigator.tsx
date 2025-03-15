import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {ButtonIcon} from '../../components/ButtonIcon'
import {TextButton} from '../../components/TextButton'
import {ExerciseAddScreen} from './ExerciseAddScreen'
import {ExerciseDetailScreen} from './ExerciseDetailScreen'
import {ExerciseEditScreen} from './ExerciseEditScreen'
import {ExerciseListScreen} from './ExerciseListScreen'
import {
  ExerciseDetailScreenNavigationProp,
  ExerciseDetailScreenRouteProp,
  ExerciseStackParamList,
} from './types'
import {theme} from '../../theming/theme'

const Stack = createNativeStackNavigator<ExerciseStackParamList>()

export const ExerciseNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExerciseListScreen"
        component={ExerciseListScreen}
        options={({navigation}) => ({
          title: 'Exercises',
          headerRight: () => (
            <ButtonIcon
              name="add"
              onPress={() => navigation.navigate('ExerciseAddScreen')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ExerciseDetailScreen"
        component={ExerciseDetailScreen}
        options={({
          navigation,
          route,
        }: {
          navigation: ExerciseDetailScreenNavigationProp
          route: ExerciseDetailScreenRouteProp
        }) => ({
          title: 'Exercise',
          headerRight: () => (
            <TextButton
              title="Edit"
              onPress={() => {
                navigation.navigate('ExerciseEditScreen', {
                  exerciseId: route.params.exerciseId,
                })
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ExerciseAddScreen"
        component={ExerciseAddScreen}
        options={{
          title: 'New exercise',
        }}
      />
      <Stack.Screen
        name="ExerciseEditScreen"
        component={ExerciseEditScreen}
        options={{
          title: 'Edit exercise',
          headerStyle: {
            backgroundColor: theme.colors.background.editing,
          },
        }}
      />
    </Stack.Navigator>
  )
}
