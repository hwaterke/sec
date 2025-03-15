import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {Button} from '../../components/Button'
import {Text} from '../../components/Text'
import {Screen} from '../../design/layout/Screen'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {WorkoutSetForm} from './WorkoutSetForm'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {WorkoutSetWithExercise} from '../../database/schema'
import {isNullish} from 'remeda'
import {Temporal} from 'temporal-polyfill'
import {epochFromDateAndTime} from '../../utils/formatters'

type WorkoutSetEditScreenNavigationProp = RouteProp<
  MainStackNavigatorParamList,
  'WorkoutSetEditScreen'
>

export const WorkoutSetEditScreen = () => {
  const {params} = useRoute<WorkoutSetEditScreenNavigationProp>()
  const navigation = useNavigation()
  const [ws, setWorkoutSet] = useState<WorkoutSetWithExercise | null>(null)

  useEffect(() => {
    const main = async () => {
      const data = await WorkoutSetService.getOne(params.workoutSetId)
      setWorkoutSet(data)
    }
    void main()
  }, [params.workoutSetId])

  if (!ws) {
    return <Text>No data</Text>
  }

  const executedAt = Temporal.Instant.fromEpochSeconds(
    ws.executedAt
  ).toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO().getTimeZone())

  return (
    <Screen withPadding>
      <WorkoutSetForm
        exercise={ws.exercise}
        initialValues={{
          executionDate: executedAt.toPlainDate().toString(),
          executionTime: executedAt
            .toPlainTime()
            .toString({fractionalSecondDigits: 0}),
          repetitions: isNullish(ws.repetitions) ? '' : `${ws.repetitions}`,
          weight: isNullish(ws.weight) ? '' : `${ws.weight}`,
          distance: isNullish(ws.distance) ? '' : `${ws.distance}`,
          time: ws.time ?? '',
          notes: ws.notes ?? '',
        }}
        onSubmit={async (v) => {
          const epochSeconds = epochFromDateAndTime(
            v.executionDate,
            v.executionTime
          )

          await WorkoutSetService.update({
            id: ws.id,
            data: {
              exerciseId: ws.exerciseId,
              repetitions: v.repetitions === '' ? null : Number(v.repetitions),
              weight:
                v.weight === '' ? null : Number(v.weight.replaceAll(',', '.')),
              distance: v.distance === '' ? null : Number(v.distance),
              time: v.time === '' ? null : v.time,
              executedAt: epochSeconds,
              notes: v.notes,
            },
          })

          navigation.goBack()
        }}
      />

      <Button
        withTopMargin
        onPress={async () => {
          await WorkoutSetService.remove({id: params.workoutSetId})
          navigation.goBack()
        }}
      >
        Delete
      </Button>
    </Screen>
  )
}
