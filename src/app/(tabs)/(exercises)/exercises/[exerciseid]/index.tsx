import {router, Stack, useFocusEffect, useLocalSearchParams} from 'expo-router'
import React, {useCallback, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {isNullish} from 'remeda'
import {Badge} from '../../../../../components/Badge'
import {Button} from '../../../../../components/Button'
import {WorkoutSetRow} from '../../../../../components/WorkoutSetRow'
import {Exercise, WorkoutSet} from '../../../../../database/schema'
import {ExerciseService} from '../../../../../services/ExerciseService'
import {WorkoutSetService} from '../../../../../services/WorkoutSetService'
import {formatEpochTimestamp} from '../../../../../utils/formatters'
import {TextButton} from '../../../../../components/TextButton'

export default function ExerciseDetailScreen() {
  const params = useLocalSearchParams<{exerciseid: string}>()
  const exerciseId = params.exerciseid

  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [lastSets, setLastSets] = useState<WorkoutSet[]>([])

  useFocusEffect(
    useCallback(() => {
      const main = async () => {
        const data = await ExerciseService.getOne(exerciseId)
        setExercise(data)
        const setData =
          await WorkoutSetService.getLastWorkoutSetsForExercise(exerciseId)
        setLastSets(setData)
      }
      void main()
    }, [exerciseId])
  )

  if (!exercise) {
    return <Text>No data</Text>
  }

  return (
    <View className="flex-1 bg-light-bg p-6 gap-2">
      <Stack.Screen
        options={{
          headerRight: () => (
            <TextButton
              title="Edit"
              onPress={() => {
                router.navigate(`/exercises/${exerciseId}/edit`)
              }}
            />
          ),
        }}
      />

      <View>
        <Text className="text-2xl">{exercise.name}</Text>
        {!isNullish(exercise.description) && (
          <Text className="text-sm">{exercise.description}</Text>
        )}
        <View className="flex flex-row gap-1">
          {exercise.hasRepetitions && <Badge text="Repetitions" />}
          {exercise.hasWeight && <Badge text="Weight" />}
          {exercise.hasTime && <Badge text="Time" />}
          {exercise.hasDistance && <Badge text="Distance" />}
          {exercise.isCardio && <Badge text="Cardio" />}
          {exercise.isMachine && <Badge text="Machine" />}
          {exercise.isDumbbell && <Badge text="Dumbbell" />}
          {exercise.isBarbell && <Badge text="Barbell" />}
        </View>
      </View>

      {lastSets.length > 0 && (
        <View>
          {lastSets.map((ws) => (
            <TouchableOpacity
              key={ws.id}
              onPress={() => {
                router.navigate({
                  pathname: '/workout-set/[exerciseid]/add',
                  params: {
                    exerciseid: exerciseId,
                    repetitions: ws.repetitions ?? undefined,
                    weight: ws.weight ?? undefined,
                    distance: ws.distance ?? undefined,
                    time: ws.time ?? undefined,
                    // Notes are not passed
                  },
                })
              }}
            >
              <WorkoutSetRow value={ws} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Button
        onPress={() => {
          router.navigate({
            pathname: '/workout-set/[exerciseid]/add',
            params: {
              exerciseid: exerciseId,
            },
          })
        }}
      >
        Add a set
      </Button>

      <View className="flex-row">
        <Text>Created at:</Text>
        <Text>{formatEpochTimestamp(exercise.createdAt)}</Text>
      </View>
      <View className="flex-row">
        <Text>Updated at:</Text>
        <Text>{formatEpochTimestamp(exercise.updatedAt)}</Text>
      </View>
    </View>
  )
}
