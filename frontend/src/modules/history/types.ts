import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'

export type HistoryStackParamList = {
  HistoryScreen: undefined
  HistoryDayScreen: {date: string; isEditing: boolean}
}

export type HistoryDayScreenNavigationProp = StackNavigationProp<
  HistoryStackParamList,
  'HistoryDayScreen'
>

export type HistoryDayScreenRouteProp = RouteProp<
  HistoryStackParamList,
  'HistoryDayScreen'
>
