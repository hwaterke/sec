import React from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import {Text} from '../../components/Text'
import {gql} from '@apollo/client'
import {useWorkoutDaysQuery} from '../../graphql/graphql.codegen'
import styled from 'styled-components/native'
import {px, py} from '../../design/constants/spacing'
import {Screen} from '../../design/layout/Screen'
import {useNavigation} from '@react-navigation/native'

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
  const {data} = useWorkoutDaysQuery()

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
