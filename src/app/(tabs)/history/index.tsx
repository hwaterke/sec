import {router, Stack, useFocusEffect} from 'expo-router'
import React, {useCallback, useState} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {Calendar, DateData} from 'react-native-calendars'
import {TextButton} from '../../../components/TextButton'
import {WorkoutSetService} from '../../../services/WorkoutSetService'
import {formatDate} from '../../../utils/formatters'

export default function HistoryScreen() {
  const [showCalendar, setShowCalendar] = useState(true)

  const [workoutDays, setWorkoutDays] = useState<
    {date: string; count: number}[]
  >([])

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
      <Stack.Screen
        options={{
          title: 'History',
          headerRight: () => (
            <TextButton
              onPress={() => {
                setShowCalendar(!showCalendar)
              }}
              title={showCalendar ? 'List' : 'Calendar'}
            />
          ),
        }}
      />
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
              router.navigate(`/history/${workoutDay.date}`)
            }
          }}
        />
      ) : (
        <FlatList
          data={workoutDays}
          renderItem={({item: {date, count}}) => (
            <TouchableOpacity
              onPress={() => {
                router.navigate(`/history/${date}`)
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
