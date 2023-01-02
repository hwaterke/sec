import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {Button} from '../../components/Button'
import {Text} from '../../components/Text'
import {WorkoutSet} from '../../database/entities/workout_set.entity'
import {Screen} from '../../design/layout/Screen'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {WorkoutSetForm} from './WorkoutSetForm'
import {WorkoutSetService} from './WorkoutSetService'

type WorkoutSetEditScreenNavigationProp = RouteProp<
  MainStackNavigatorParamList,
  'WorkoutSetEditScreen'
>

export const WorkoutSetEditScreen = () => {
  const {params} = useRoute<WorkoutSetEditScreenNavigationProp>()
  const navigation = useNavigation()
  const [ws, setWorkoutSet] = useState<WorkoutSet | null>(null)

  useEffect(() => {
    const main = async () => {
      const data = await WorkoutSetService.getOne(params.workoutSetUuid)
      setWorkoutSet(data)
    }
    main()
  })

  if (!ws) {
    return <Text>No data</Text>
  }

  return (
    <Screen withPadding>
      <WorkoutSetForm
        exercise={ws.exercise}
        initialValues={{
          executedAt: ws.executedAt.toISOString(),
          repetitions: ws.repetitions ? `${ws.repetitions}` : '',
          weight: ws.weight ? `${ws.weight}` : '',
          distance: ws.distance ? `${ws.distance}` : '',
          time: ws.time || '',
        }}
        onSubmit={async (v) => {
          await WorkoutSetService.update({
            uuid: ws.uuid,
            data: {
              exerciseUuid: ws?.exerciseUuid,
              repetitions:
                v.repetitions === '' ? undefined : Number(v.repetitions),
              weight:
                v.weight === ''
                  ? undefined
                  : Number(v.weight.replaceAll(',', '.')),
              distance: v.distance === '' ? undefined : Number(v.distance),
              time: v.time === '' ? undefined : v.time,
              executedAt: v.executedAt,
            },
          })

          navigation.goBack()
        }}
      />

      <Button
        withTopMargin
        onPress={async () => {
          await WorkoutSetService.remove({uuid: params.workoutSetUuid})

          navigation.goBack()
        }}
      >
        Delete
      </Button>
    </Screen>
  )
}
