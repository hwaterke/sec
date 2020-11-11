import React from 'react'
import {Text} from 'react-native'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {gql} from '@apollo/client'
import {
  useCreateWorkoutSetMutation,
  useExerciseDetailQuery,
} from '../../graphql/graphql.codegen'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {WorkoutSetForm} from './WorkoutSetForm'

type WorkoutSetAddScreenNavigationProp = RouteProp<
  MainStackNavigatorParamList,
  'WorkoutSetAddScreen'
>

gql`
  mutation createWorkoutSet($workoutSet: WorkoutSetInput!) {
    createWorkoutSet(payload: $workoutSet) {
      uuid
    }
  }
`

export const WorkoutSetAddScreen: React.FC = () => {
  const {params} = useRoute<WorkoutSetAddScreenNavigationProp>()
  const navigation = useNavigation()
  const [createWorkoutSet] = useCreateWorkoutSetMutation()

  const {data, loading, error} = useExerciseDetailQuery({
    variables: {uuid: params.exerciseUuid},
  })

  if (!data) {
    return <Text>No data</Text>
  }

  return (
    <WorkoutSetForm
      exercise={data.exercise}
      onSubmit={async (v) => {
        // TODO Handle null values and empty string for numbers parsing
        await createWorkoutSet({
          variables: {
            workoutSet: {
              exerciseUuid: params.exerciseUuid,
              repetitions: Number(v.repetitions),
              weight: Number(v.weight),
              distance: Number(v.distance),
              time: v.time,
              executedAt: new Date(),
            },
          },
        })
        navigation.goBack()
      }}
    />
  )
}
