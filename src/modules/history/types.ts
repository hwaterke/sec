import {RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export type HistoryStackParamList = {
  HistoryScreen: undefined
  HistoryDayScreen: {date: string; isEditing: boolean}
}

export type HistoryDayScreenNavigationProp = NativeStackNavigationProp<
  HistoryStackParamList,
  'HistoryDayScreen'
>

export type HistoryDayScreenRouteProp = RouteProp<
  HistoryStackParamList,
  'HistoryDayScreen'
>
