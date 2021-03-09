import React from 'react'
import {useCreateExerciseMutation} from '../../graphql/graphql.codegen'
import {StackNavigationProp} from '@react-navigation/stack'
import {ExerciseForm} from './ExerciseForm'
import {gql} from '@apollo/client'
import {Screen} from '../../design/layout/Screen'
import {ScrollView} from '../../design/layout/ScrollView'

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
    <ScrollView>
      <Screen withPadding>
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
      </Screen>
    </ScrollView>
  )
}
