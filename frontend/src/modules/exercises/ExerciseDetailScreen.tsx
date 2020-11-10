import React from 'react'
import {Button, Text, View} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {gql} from '@apollo/client'
import {useExerciseDetailQuery} from '../../graphql/graphql.codegen'
import {ExerciseDetailScreenRouteProp} from './types'
import styled from 'styled-components/native'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'

const Title = styled.Text`
  font-size: 24px;
  padding: 8px 16px;
`

gql`
  query exerciseDetail($uuid: ID!) {
    exercise(uuid: $uuid) {
      uuid
      name
      lastWorkoutSets {
        uuid
        executedAt
        repetitions
      }
    }
  }
`

export const ExerciseDetailScreen: React.FC = () => {
  const {params} = useRoute<ExerciseDetailScreenRouteProp>()
  const navigation = useNavigation()
  const {data, loading, error} = useExerciseDetailQuery({
    variables: {uuid: params.exerciseUuid},
  })

  if (loading) {
    return <Text>Loading</Text>
  }

  if (error) {
    return <Text>{JSON.stringify(error, null, 2)}</Text>
  }

  if (!data) {
    return <Text>No data</Text>
  }

  return (
    <View>
      <Title>{data.exercise.name}</Title>

      {data.exercise.lastWorkoutSets.map((ws) => (
        <WorkoutSetRow key={ws.uuid} value={ws} />
      ))}

      <Text>{JSON.stringify(data, null, 2)}</Text>

      <Text>Add SET</Text>

      <Button
        title="Add a set"
        onPress={() => {
          navigation.navigate('WorkoutSetAddScreen', {
            exerciseUuid: params.exerciseUuid,
          })
        }}
      />
    </View>
  )
}
