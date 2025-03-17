import {useLocalSearchParams, useRouter} from 'expo-router'
import {useEffect, useState} from 'react'
import {Text, View} from 'react-native'
import {isNullish} from 'remeda'
import {Temporal} from 'temporal-polyfill'
import {Button} from '../../../components/Button'
import {WorkoutSetWithExercise} from '../../../database/schema'
import {WorkoutSetForm} from '../../../modules/workoutSet/WorkoutSetForm'
import {WorkoutSetService} from '../../../services/WorkoutSetService'
import {epochFromDateAndTime} from '../../../utils/formatters'

export default function WorkoutSetEditScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{id: string}>()
  const [ws, setWorkoutSet] = useState<WorkoutSetWithExercise | null>(null)

  useEffect(() => {
    const main = async () => {
      const data = await WorkoutSetService.getOne(params.id)
      setWorkoutSet(data)
    }
    void main()
  }, [params.id])

  if (!ws) {
    return <Text>No data</Text>
  }

  const executedAt = Temporal.Instant.fromEpochSeconds(
    ws.executedAt
  ).toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO().getTimeZone())

  return (
    <View className="flex-1 bg-light-bg p-3">
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

          router.back()
        }}
      />

      <Button
        className="mt-4"
        onPress={async () => {
          await WorkoutSetService.remove({id: params.id})
          router.back()
        }}
      >
        Delete
      </Button>
    </View>
  )
}
