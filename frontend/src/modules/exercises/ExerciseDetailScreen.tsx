import {gql} from '@apollo/client'
import {useNavigation, useRoute} from '@react-navigation/native'
import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {Button} from '../../components/Button'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'
import {mb, ml} from '../../design/constants/spacing'
import {Screen} from '../../design/layout/Screen'
import {useExerciseDetailQuery} from '../../graphql/graphql.codegen'
import {ExerciseDetailScreenRouteProp} from './types'

const Title = styled.Text`
  font-size: 24px;
  ${ml(2)};
  ${mb(2)};
`

gql`
  query exerciseDetail($uuid: ID!) {
    exercise(uuid: $uuid) {
      uuid
      name
      description
      hasRepetitions
      hasWeight
      hasDistance
      hasTime
      muscle
      isCardio
      isMachine
      isDumbbell
      isBarbell

      lastWorkoutSets {
        uuid
        executedAt
        repetitions
        weight
        distance
        time
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
    <Screen withPadding>
      <Title>{data.exercise.name}</Title>

      {data.exercise.lastWorkoutSets.map((ws) => (
        <TouchableOpacity
          key={ws.uuid}
          onPress={() => {
            navigation.navigate('WorkoutSetAddScreen', {
              exerciseUuid: params.exerciseUuid,
              repetitions: ws.repetitions,
              weight: ws.weight,
              distance: ws.distance,
              time: ws.time,
            })
          }}
        >
          <WorkoutSetRow value={ws} />
        </TouchableOpacity>
      ))}

      <Button
        onPress={() => {
          navigation.navigate('WorkoutSetAddScreen', {
            exerciseUuid: params.exerciseUuid,
          })
        }}
        withTopMargin
      >
        Add a set
      </Button>
    </Screen>
  )
}
