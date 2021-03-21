import {gql} from '@apollo/client'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import React from 'react'
import {Button} from '../../components/Button'
import {Text} from '../../components/Text'
import {Screen} from '../../design/layout/Screen'
import {
  useDeleteWorkoutSetMutation,
  useUpdateWorkoutSetMutation,
  useWorkoutSetQuery,
} from '../../graphql/graphql.codegen'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {WorkoutSetForm} from './WorkoutSetForm'

type WorkoutSetEditScreenNavigationProp = RouteProp<
  MainStackNavigatorParamList,
  'WorkoutSetEditScreen'
>

gql`
  query workoutSet($uuid: ID!) {
    workoutSet(uuid: $uuid) {
      uuid
      exercise {
        uuid
        hasRepetitions
        hasWeight
        hasDistance
        hasTime
      }
      repetitions
      weight
      distance
      time
      executedAt
    }
  }

  mutation updateWorkoutSet($uuid: ID!, $payload: WorkoutSetUpdateInput!) {
    updateWorkoutSet(uuid: $uuid, payload: $payload) {
      uuid
      repetitions
      weight
      distance
      time
      executedAt
    }
  }

  mutation deleteWorkoutSet($uuid: ID!) {
    deleteWorkoutSet(uuid: $uuid) {
      affected_uuids
    }
  }
`

export const WorkoutSetEditScreen = () => {
  const {params} = useRoute<WorkoutSetEditScreenNavigationProp>()
  const navigation = useNavigation()
  const [updateWorkoutSet] = useUpdateWorkoutSetMutation()
  const [deleteWorkoutSet] = useDeleteWorkoutSetMutation()
  const {data, loading} = useWorkoutSetQuery({
    variables: {
      uuid: params.workoutSetUuid,
    },
  })

  if (loading) {
    return <Text>Loading</Text>
  }
  if (!data) {
    return <Text>No data</Text>
  }

  const ws = data.workoutSet

  return (
    <Screen withPadding>
      <WorkoutSetForm
        exercise={ws.exercise}
        initialValues={{
          executedAt: ws.executedAt,
          repetitions: ws.repetitions ? `${ws.repetitions}` : '',
          weight: ws.weight ? `${ws.weight}` : '',
          distance: ws.distance ? `${ws.distance}` : '',
          time: ws.time || '',
        }}
        onSubmit={async (v) => {
          await updateWorkoutSet({
            variables: {
              uuid: ws.uuid,
              payload: {
                repetitions:
                  v.repetitions === '' ? null : Number(v.repetitions),
                weight:
                  v.weight === ''
                    ? null
                    : Number(v.weight.replaceAll(',', '.')),
                distance: v.distance === '' ? null : Number(v.distance),
                time: v.time === '' ? null : v.time,
                executedAt: v.executedAt,
              },
            },
          })

          navigation.goBack()
        }}
      />

      <Button
        withTopMargin
        onPress={async () => {
          await deleteWorkoutSet({
            variables: {
              uuid: params.workoutSetUuid,
            },
          })
          navigation.goBack()
        }}
      >
        Delete
      </Button>
    </Screen>
  )
}
