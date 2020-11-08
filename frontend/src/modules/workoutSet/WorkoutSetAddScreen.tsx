import React from 'react'
import {Button, Text, View} from 'react-native'
import {RouteProp, useRoute} from '@react-navigation/native'
import {gql} from '@apollo/client'
import {useCreateWorkoutSetMutation} from '../../graphql/graphql.codegen'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'

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
  const [createWorkoutSet] = useCreateWorkoutSetMutation()

  return (
    <View>
      <Text>{JSON.stringify(params, null, 2)}</Text>

      <Button
        title="Add"
        onPress={() => {
          return createWorkoutSet({
            variables: {
              workoutSet: {
                exerciseUuid: params.exerciseUuid,
                repetitions: 22,
                executedAt: new Date(),
              },
            },
          })
        }}
      />
    </View>
  )
}
