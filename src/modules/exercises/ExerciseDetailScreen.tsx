import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native'
import React, {useCallback, useState} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {Button} from '../../components/Button'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'
import {Exercise} from '../../database/entities/exercise.entity'
import {WorkoutSet} from '../../database/entities/workout_set.entity'
import {mb, ml} from '../../design/constants/spacing'
import {Screen} from '../../design/layout/Screen'
import {ExerciseService} from './ExerciseService'
import {ExerciseDetailScreenRouteProp} from './types'
import {NavigationProp} from '@react-navigation/core/src/types'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'

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
        const data = await ExerciseService.getOne(params.exerciseUuid)
        setExercise(data)
        const setData = await ExerciseService.getLastWorkoutSets(
          params.exerciseUuid
        )
        setLastSets(setData)
      }
      main()
    }, [])
  )

  if (!exercise) {
    return <Text>No data</Text>
  }

  return (
    <Screen withPadding>
      <Title>{exercise.name}</Title>

      {lastSets.map((ws) => (
        <TouchableOpacity
          key={ws.uuid}
          onPress={() => {
            navigation.navigate('WorkoutSetAddScreen', {
              exerciseUuid: params.exerciseUuid,
              repetitions: ws.repetitions,
              weight: ws.weight,
              distance: ws.distance,
              time: ws.time,
            })
          }}
        >
          <WorkoutSetRow value={ws} withDate />
        </TouchableOpacity>
      ))}

      <Button
        onPress={() => {
          navigation.navigate('WorkoutSetAddScreen', {
            exerciseUuid: params.exerciseUuid,
          })
        }}
        withTopMargin
      >
        Add a set
      </Button>
    </Screen>
  )
}
