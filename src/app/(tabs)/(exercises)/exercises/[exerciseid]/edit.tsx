import React from 'react'
import {ScrollView, Text} from 'react-native'
import {Button} from '../../../../../components/Button'
import {useExercise} from '../../../../../hooks/useExercise'
import {ExerciseService} from '../../../../../services/ExerciseService'
import {ExerciseForm} from '../../../../../modules/exercises/ExerciseForm'
import {useLocalSearchParams, useRouter} from 'expo-router'

export default function ExerciseEditScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{exerciseid: string}>()
  const exerciseId = params.exerciseid

  const [exercise] = useExercise({
    id: exerciseId,
    refreshOnFocus: false,
  })

  if (!exercise) {
    return <Text>Loading</Text>
  }

  return (
    <ScrollView className="flex-1 bg-light-bg p-3">
      <Text>EDITING</Text>
      <ExerciseForm
        initialValues={{
          name: exercise.name,
          description: exercise.description ?? '',
          hasRepetitions: exercise.hasRepetitions,
          hasWeight: exercise.hasWeight,
          hasTime: exercise.hasTime,
          hasDistance: exercise.hasDistance,
          muscle: exercise.muscle ?? '',
          isCardio: exercise.isCardio,
          isMachine: exercise.isMachine,
          isDumbbell: exercise.isDumbbell,
          isBarbell: exercise.isBarbell,
        }}
        onSubmit={async (values) => {
          try {
            await ExerciseService.update({
              id: exerciseId,
              data: values,
            })
            router.back()
          } catch (err) {
            alert(`Update exercise error ${error}`)
          }
        }}
      />

      <Button
        className="mt-4"
        onPress={async () => {
          await ExerciseService.remove({id: exerciseId})
          router.replace('/exercises')
        }}
      >
        Delete
      </Button>
    </ScrollView>
  )
}
