import {gql} from '@apollo/client'
import React from 'react'
import {Text} from 'react-native'
import {Button} from '../../components/Button'
import {Screen} from '../../design/layout/Screen'
import {ScrollView} from '../../design/layout/ScrollView'
import {
  useDeleteExerciseMutation,
  useExerciseQuery,
  useUpdateExerciseMutation,
} from '../../graphql/graphql.codegen'
import {ExerciseForm} from './ExerciseForm'
import {
  ExerciseEditScreenNavigationProp,
  ExerciseEditScreenRouteProp,
} from './types'

gql`
  query exercise($uuid: ID!) {
    exercise(uuid: $uuid) {
      uuid
      name
      description
      hasRepetitions
      hasWeight
      hasTime
      hasDistance
      muscle

      isCardio
      isMachine
      isDumbbell
      isBarbell
    }
  }

  mutation updateExercise($uuid: ID!, $payload: ExerciseInput!) {
    updateExercise(uuid: $uuid, payload: $payload) {
      uuid
      name
      muscle
    }
  }

  mutation deleteExercise($uuid: ID!) {
    deleteExercise(uuid: $uuid) {
      affected_uuids
    }
  }
`

type Props = {
  navigation: ExerciseEditScreenNavigationProp
  route: ExerciseEditScreenRouteProp
}

export const ExerciseEditScreen: React.FC<Props> = ({navigation, route}) => {
  const {data, loading} = useExerciseQuery({
    variables: {
      uuid: route.params.exerciseUuid,
    },
    fetchPolicy: 'network-only',
  })
  const [updateExercise] = useUpdateExerciseMutation()
  const [deleteExercise] = useDeleteExerciseMutation()

  if (loading || !data) {
    return <Text>Loading</Text>
  }

  return (
    <ScrollView>
      <Screen withPadding>
        <Text>EDITING</Text>
        <ExerciseForm
          initialValues={{
            name: data.exercise.name,
            description: data.exercise.description,
            hasRepetitions: data.exercise.hasRepetitions,
            hasWeight: data.exercise.hasWeight,
            hasTime: data.exercise.hasTime,
            hasDistance: data.exercise.hasDistance,
            muscle: data.exercise.muscle,
            isCardio: data.exercise.isCardio,
            isMachine: data.exercise.isMachine,
            isDumbbell: data.exercise.isDumbbell,
            isBarbell: data.exercise.isBarbell,
          }}
          onSubmit={async (values) => {
            try {
              await updateExercise({
                variables: {uuid: route.params.exerciseUuid, payload: values},
              })
              navigation.goBack()
            } catch (err) {
              alert('Update exercise error ' + err)
            }
          }}
        />

        <Button
          withTopMargin
          onPress={async () => {
            await deleteExercise({
              variables: {
                uuid: route.params.exerciseUuid,
              },
            })
            navigation.replace('ExerciseListScreen')
          }}
        >
          Delete
        </Button>
      </Screen>
    </ScrollView>
  )
}
