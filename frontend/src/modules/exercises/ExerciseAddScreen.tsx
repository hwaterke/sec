import React from 'react'
import {useCreateExerciseMutation} from '../../graphql/graphql.codegen'
import {StackNavigationProp} from '@react-navigation/stack'
import {ExerciseForm} from './ExerciseForm'
import {gql} from '@apollo/client'

gql`
  mutation createExercise($payload: ExerciseInput!) {
    createExercise(payload: $payload) {
      uuid
      name
      muscle
    }
  }
`

type Props = {
  navigation: StackNavigationProp<{}>
}

export const ExerciseAddScreen: React.FC<Props> = ({navigation}) => {
  const [createExercise] = useCreateExerciseMutation()

  return (
    <ExerciseForm
      onSubmit={async (values) => {
        try {
          await createExercise({variables: {payload: values}})
          navigation.goBack()
        } catch (err) {
          alert('Create exercise error ' + err)
        }
      }}
    />
  )
}
