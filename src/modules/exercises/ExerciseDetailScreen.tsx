import {NavigationProp} from '@react-navigation/core/src/types'
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native'
import React, {useCallback, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {isNullish} from 'remeda'
import {Button} from '../../components/Button'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'
import {Exercise, WorkoutSet} from '../../database/schema'
import {ExerciseService} from '../../services/ExerciseService'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {formatEpochTimestamp} from '../../utils/formatters'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {ExerciseDetailScreenRouteProp} from './types'

export const ExerciseDetailScreen: React.FC = () => {
  const {params} = useRoute<ExerciseDetailScreenRouteProp>()
  const navigation =
    useNavigation<NavigationProp<MainStackNavigatorParamList>>()

  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [lastSets, setLastSets] = useState<WorkoutSet[]>([])

  useFocusEffect(
    useCallback(() => {
      const main = async () => {
        const data = await ExerciseService.getOne(params.exerciseId)
        setExercise(data)
        const setData = await WorkoutSetService.getLastWorkoutSetsForExercise(
          params.exerciseId
        )
        setLastSets(setData)
      }
      void main()
    }, [params.exerciseId])
  )

  if (!exercise) {
    return <Text>No data</Text>
  }

  return (
    <View className="flex-1 bg-light-bg p-6">
      <View className="mb-2">
        <Text className="text-2xl">{exercise.name}</Text>
        {!isNullish(exercise.description) && (
          <Text className="text-sm">{exercise.description}</Text>
        )}
      </View>

      {lastSets.map((ws) => (
        <TouchableOpacity
          key={ws.id}
          onPress={() => {
            navigation.navigate('WorkoutSetAddScreen', {
              exerciseId: params.exerciseId,
              repetitions: ws.repetitions ?? undefined,
              weight: ws.weight ?? undefined,
              distance: ws.distance ?? undefined,
              time: ws.time ?? undefined,
              // Notes are not passed
            })
          }}
        >
          <WorkoutSetRow value={ws} />
        </TouchableOpacity>
      ))}

      <Button
        onPress={() => {
          navigation.navigate('WorkoutSetAddScreen', {
            exerciseId: params.exerciseId,
          })
        }}
        className="mt-4"
      >
        Add a set
      </Button>

      <View className="flex-row mt-2">
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
