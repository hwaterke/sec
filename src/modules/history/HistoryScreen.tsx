import {NavigationProp} from '@react-navigation/core/src/types'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import React, {useCallback, useLayoutEffect, useState} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {Calendar, DateData} from 'react-native-calendars'
import {TextButton} from '../../components/TextButton'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {formatDate} from '../../utils/formatters'
import {HistoryStackParamList} from './types'

export const HistoryScreen: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(true)
  const navigation = useNavigation<NavigationProp<HistoryStackParamList>>()

  const [workoutDays, setWorkoutDays] = useState<
    {date: string; count: number}[]
  >([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextButton
          onPress={() => {
            setShowCalendar(!showCalendar)
          }}
          title={showCalendar ? 'List' : 'Calendar'}
        />
      ),
    })
  }, [navigation, showCalendar, setShowCalendar])

  useFocusEffect(
    useCallback(() => {
      const main = async () => {
        const data = await WorkoutSetService.workoutDays()
        setWorkoutDays(data)
      }
      void main()
    }, [])
  )

  return (
    <View className="flex-1 bg-light-bg">
      {showCalendar ? (
        <Calendar
          enableSwipeMonths
          firstDay={1}
          markedDates={workoutDays.reduce(
            (acc: Record<string, {selected: boolean}>, day) => {
              acc[day.date] = {selected: true}
              return acc
            },
            {}
          )}
          onDayPress={(day: DateData) => {
            const workoutDay = workoutDays.find(
              ({date}) => date === day.dateString
            )
            if (workoutDay) {
              navigation.navigate('HistoryDayScreen', {
                date: workoutDay.date,
                isEditing: false,
              })
            }
          }}
        />
      ) : (
        <FlatList
          data={workoutDays}
          renderItem={({item: {date, count}}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HistoryDayScreen', {
                  date,
                  isEditing: false,
                })
              }}
            >
              <View className="flex flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
                <Text>{formatDate(date)}</Text>
                <Text>{count}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.date}
        />
      )}
    </View>
  )
}
