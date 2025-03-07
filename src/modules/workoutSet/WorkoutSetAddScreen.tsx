import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {DateTime} from 'luxon'
import React from 'react'
import {Text} from 'react-native'
import {Screen} from '../../design/layout/Screen'
import {useExercise} from '../../hooks/useExercise'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {WorkoutSetForm} from './WorkoutSetForm'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {NavigationProp} from '@react-navigation/core/src/types'
import {HistoryStackParamList} from '../history/types'
import {isNullish} from 'remeda'

type WorkoutSetAddScreenNavigationProp = RouteProp<
  MainStackNavigatorParamList,
  'WorkoutSetAddScreen'
>

export const WorkoutSetAddScreen: React.FC = () => {
  const {params} = useRoute<WorkoutSetAddScreenNavigationProp>()
  const navigation = useNavigation<NavigationProp<HistoryStackParamList>>()
  const [exercise] = useExercise({
    id: params.exerciseId,
    refreshOnFocus: false,
  })

  if (!exercise) {
    return <Text>No data</Text>
  }

  return (
    <Screen withPadding>
      <WorkoutSetForm
        exercise={exercise}
        initialValues={{
          executedAt: DateTime.now().toISO(),
          repetitions: isNullish(params.repetitions)
            ? ''
            : `${params.repetitions}`,
          weight: isNullish(params.weight) ? '' : `${params.weight}`,
          distance: isNullish(params.distance) ? '' : `${params.distance}`,
          time: params.time ?? '',
          notes: params.notes ?? '',
        }}
        onSubmit={async (v) => {
          await WorkoutSetService.create({
            exerciseId: params.exerciseId,
            repetitions: v.repetitions === '' ? null : Number(v.repetitions),
            weight:
              v.weight === '' ? null : Number(v.weight.replaceAll(',', '.')),
            distance: v.distance === '' ? null : Number(v.distance),
            time: v.time === '' ? null : v.time,
            executedAt: v.executedAt,
            notes: v.notes,
          })

          navigation.navigate('HistoryDayScreen', {
            date: DateTime.fromISO(v.executedAt).toISODate()!,
            isEditing: false,
          })
        }}
      />
    </Screen>
  )
}
