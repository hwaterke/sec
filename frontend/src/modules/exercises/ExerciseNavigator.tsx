import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ExerciseListScreen} from './ExerciseListScreen'
import {ExerciseAddScreen} from './ExerciseAddScreen'
import {ButtonIcon} from '../../components/ButtonIcon'
import {ExerciseDetailScreen} from './ExerciseDetailScreen'
import {Button} from 'react-native'
import {ExerciseEditScreen} from './ExerciseEditScreen'
import {
  ExerciseDetailScreenNavigationProp,
  ExerciseDetailScreenRouteProp,
  ExerciseStackParamList,
} from './types'

const Stack = createStackNavigator<ExerciseStackParamList>()

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
              name="ios-add"
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
            <Button
              title="Edit"
              onPress={() => {
                navigation.navigate('ExerciseEditScreen', {
                  exerciseUuid: route.params.exerciseUuid,
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
        }}
      />
    </Stack.Navigator>
  )
}
