import {gql} from '@apollo/client'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {DateTime} from 'luxon'
import React, {useCallback, useLayoutEffect, useState} from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import {Calendar} from 'react-native-calendars'
import styled from 'styled-components/native'
import {Text} from '../../components/Text'
import {TextButton} from '../../components/TextButton'
import {px, py} from '../../design/constants/spacing'
import {Screen} from '../../design/layout/Screen'
import {useWorkoutDaysLazyQuery} from '../../graphql/graphql.codegen'

const Row = styled.View`
  flex-direction: row;
  ${px(4)};
  ${py(4)};
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.background.row};
  border-bottom-color: #e5e5e5;
  border-bottom-width: 0.5px;
`

gql`
  query workoutDays {
    workoutDays {
      date
      count
    }
  }
`

export const HistoryScreen: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(true)
  const navigation = useNavigation()
  const [fetch, {data, loading, refetch}] = useWorkoutDaysLazyQuery()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextButton
          onPress={() => setShowCalendar(!showCalendar)}
          title={showCalendar ? 'List' : 'Calendar'}
        />
      ),
    })
  }, [navigation, showCalendar, setShowCalendar])

  useFocusEffect(
    useCallback(() => {
      if (refetch) {
        void refetch()
      } else {
        fetch()
      }
    }, [fetch, refetch])
  )

  if (!data) {
    return <Text>No data</Text>
  }

  return (
    <Screen>
      {showCalendar ? (
        <Calendar
          markedDates={data.workoutDays.reduce(
            (acc: {[date: string]: {selected: boolean}}, day) => {
              acc[day.date] = {selected: true}
              return acc
            },
            {}
          )}
          onDayPress={(day) => {
            const workoutDay = data.workoutDays.find(
              ({date}) => date === day.dateString
            )
            if (workoutDay) {
              navigation.navigate('HistoryDayScreen', {
                date: workoutDay.date,
              })
            }
          }}
        />
      ) : (
        <FlatList
          data={data?.workoutDays}
          renderItem={({item: {date, count}}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HistoryDayScreen', {
                  date: date,
                })
              }
            >
              <Row>
                <Text>
                  {DateTime.fromISO(date).toLocaleString(
                    DateTime.DATE_MED_WITH_WEEKDAY
                  )}
                </Text>
                <Text>{count}</Text>
              </Row>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.date}
        />
      )}
    </Screen>
  )
}
