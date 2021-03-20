import {gql} from '@apollo/client'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import React, {useCallback} from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {Text} from '../../components/Text'
import {px, py} from '../../design/constants/spacing'
import {Screen} from '../../design/layout/Screen'
import {useWorkoutDaysLazyQuery} from '../../graphql/graphql.codegen'

const Row = styled.View`
  flex-direction: row;
  ${px(4)};
  ${py(4)};
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.background.secondary};
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
  const navigation = useNavigation()
  const [fetch, {data, loading, refetch}] = useWorkoutDaysLazyQuery()

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
              <Text>{date}</Text>
              <Text>{count}</Text>
            </Row>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.date}
      />
    </Screen>
  )
}
