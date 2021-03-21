import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'

export type ExerciseStackParamList = {
  ExerciseListScreen: undefined
  ExerciseDetailScreen: {exerciseUuid: string}
  ExerciseAddScreen: undefined
  ExerciseEditScreen: {exerciseUuid: string}
}

export type ExerciseListScreenNavigationProp = StackNavigationProp<
  ExerciseStackParamList,
  'ExerciseListScreen'
>

export type ExerciseDetailScreenNavigationProp = StackNavigationProp<
  ExerciseStackParamList,
  'ExerciseDetailScreen'
>

export type ExerciseDetailScreenRouteProp = RouteProp<
  ExerciseStackParamList,
  'ExerciseDetailScreen'
>

export type ExerciseEditScreenNavigationProp = StackNavigationProp<
  ExerciseStackParamList,
  'ExerciseEditScreen'
>

export type ExerciseEditScreenRouteProp = RouteProp<
  ExerciseStackParamList,
  'ExerciseEditScreen'
>
