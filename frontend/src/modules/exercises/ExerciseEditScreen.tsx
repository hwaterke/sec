import React, {useEffect} from 'react'
import {
  useExerciseQuery,
  useUpdateExerciseMutation,
} from '../../graphql/graphql.codegen'
import {StackNavigationProp} from '@react-navigation/stack'
import {ExerciseForm} from './ExerciseForm'
import {gql} from 'apollo-boost'
import {RouteProp} from '@react-navigation/native'
import {Text, View} from 'react-native'
import {ExerciseStackParamList} from './types'

gql`
  query exercise($uuid: ID!) {
    exercise(uuid: $uuid) {
      uuid
      name
      muscle
    }
  }

  mutation updateExercise($uuid: ID!, $payload: ExerciseInput!) {
    updateExercise(uuid: $uuid, payload: $payload) {
      uuid
      name
      muscle
    }
  }
`

type ProfileScreenRouteProp = RouteProp<
  ExerciseStackParamList,
  'ExerciseEditScreen'
>
type Props = {
  navigation: StackNavigationProp<{}>
  route: ProfileScreenRouteProp
}

export const ExerciseEditScreen: React.FC<Props> = ({navigation, route}) => {
  console.log('ExerciseEditScreen', route.params)
  const {data, loading} = useExerciseQuery({
    variables: {
      uuid: route.params.exerciseUuid,
    },
    fetchPolicy: 'network-only',
  })
  const [updateExercise] = useUpdateExerciseMutation()

  if (loading || !data) {
    return <Text>Loading</Text>
  }

  return (
    <View>
      <Text>EDITING</Text>
      <ExerciseForm
        initialValues={{
          name: data.exercise.name,
          muscle: data.exercise.muscle,
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
    </View>
  )
}
