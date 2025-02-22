import {NavigationProp} from '@react-navigation/core/src/types'
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native'
import React, {useCallback, useState} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {Button} from '../../components/Button'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'
import {Exercise, WorkoutSet} from '../../database/schema'
import {mb, ml} from '../../design/constants/spacing'
import {Screen} from '../../design/layout/Screen'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {WorkoutSetService} from '../workoutSet/WorkoutSetService'
import {ExerciseService} from './ExerciseService'
import {ExerciseDetailScreenRouteProp} from './types'

const Title = styled.Text`
  font-size: 24px;
  ${ml(2)};
  ${mb(2)};
`

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
    <Screen withPadding>
      <Title>{exercise.name}</Title>

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
          <WorkoutSetRow value={ws} withDate />
        </TouchableOpacity>
      ))}

      <Button
        onPress={() => {
          navigation.navigate('WorkoutSetAddScreen', {
            exerciseId: params.exerciseId,
          })
        }}
        withTopMargin
      >
        Add a set
      </Button>
    </Screen>
  )
}
