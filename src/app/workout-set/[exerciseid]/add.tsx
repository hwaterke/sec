import {useLocalSearchParams, useRouter} from 'expo-router'
import {Text, View} from 'react-native'
import {Temporal} from 'temporal-polyfill'
import {useExercise} from '../../../hooks/useExercise'
import {WorkoutSetForm} from '../../../modules/workoutSet/WorkoutSetForm'
import {WorkoutSetService} from '../../../services/WorkoutSetService'
import {epochFromDateAndTime} from '../../../utils/formatters'

export default function WorkoutSetAddScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{
    exerciseid: string
    repetitions?: string
    weight?: string
    distance?: string
    time?: string
    notes?: string
  }>()
  const exerciseId = params.exerciseid

  const [exercise] = useExercise({
    id: exerciseId,
    refreshOnFocus: false,
  })

  if (!exercise) {
    return <Text>No data</Text>
  }

  return (
    <View className="flex-1 bg-light-bg p-3">
      <WorkoutSetForm
        exercise={exercise}
        initialValues={{
          executionDate: Temporal.Now.plainDateISO().toString(),
          executionTime: Temporal.Now.plainTimeISO().toString({
            fractionalSecondDigits: 0,
          }),
          repetitions: params.repetitions ?? '',
          weight: params.weight ?? '',
          distance: params.distance ?? '',
          time: params.time ?? '',
          notes: params.notes ?? '',
        }}
        onSubmit={async (v) => {
          const epochSeconds = epochFromDateAndTime(
            v.executionDate,
            v.executionTime
          )

          await WorkoutSetService.create({
            exerciseId,
            repetitions: v.repetitions === '' ? null : Number(v.repetitions),
            weight:
              v.weight === '' ? null : Number(v.weight.replaceAll(',', '.')),
            distance: v.distance === '' ? null : Number(v.distance),
            time: v.time === '' ? null : v.time,
            executedAt: epochSeconds,
            notes: v.notes,
          })

          router.navigate({
            pathname: '/(tabs)/history/[date]',
            params: {
              date: v.executionDate,
            },
          })
        }}
      />
    </View>
  )
}
