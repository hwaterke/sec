import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'

export type HistoryStackParamList = {
  HistoryScreen: undefined
  HistoryDayScreen: {date: string}
}

export type HistoryDayScreenNavigationProp = StackNavigationProp<
  HistoryStackParamList,
  'HistoryDayScreen'
>

export type HistoryDayScreenRouteProp = RouteProp<
  HistoryStackParamList,
  'HistoryDayScreen'
>
