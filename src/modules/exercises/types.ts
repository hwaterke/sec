import {RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export type ExerciseStackParamList = {
  ExerciseListScreen: undefined
  ExerciseDetailScreen: {exerciseId: string}
  ExerciseAddScreen: undefined
  ExerciseEditScreen: {exerciseId: string}
}

export type ExerciseListScreenNavigationProp = NativeStackNavigationProp<
  ExerciseStackParamList,
  'ExerciseListScreen'
>

export type ExerciseDetailScreenNavigationProp = NativeStackNavigationProp<
  ExerciseStackParamList,
  'ExerciseDetailScreen'
>

export type ExerciseDetailScreenRouteProp = RouteProp<
  ExerciseStackParamList,
  'ExerciseDetailScreen'
>

export type ExerciseEditScreenNavigationProp = NativeStackNavigationProp<
  ExerciseStackParamList,
  'ExerciseEditScreen'
>

export type ExerciseEditScreenRouteProp = RouteProp<
  ExerciseStackParamList,
  'ExerciseEditScreen'
>
