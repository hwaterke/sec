import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'

export type ExerciseStackParamList = {
  ExerciseListScreen: undefined
  ExerciseDetailScreen: {exerciseUuid: string}
  ExerciseAddScreen: undefined
  ExerciseEditScreen: {exerciseUuid: string}
}

export type ExerciseDetailScreenNavigationProp = StackNavigationProp<
  ExerciseStackParamList,
  'ExerciseDetailScreen'
>

export type ExerciseDetailScreenRouteProp = RouteProp<
  ExerciseStackParamList,
  'ExerciseDetailScreen'
>
