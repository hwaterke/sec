import {NavigationProp} from '@react-navigation/core/src/types'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import React from 'react'
import {Text} from 'react-native'
import {isNullish} from 'remeda'
import {Temporal} from 'temporal-polyfill'
import {Screen} from '../../design/layout/Screen'
import {useExercise} from '../../hooks/useExercise'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {HistoryStackParamList} from '../history/types'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {WorkoutSetForm} from './WorkoutSetForm'
import {epochFromDateAndTime} from '../../utils/formatters'

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
          executionDate: Temporal.Now.plainDateISO().toString(),
          executionTime: Temporal.Now.plainTimeISO().toString({
            fractionalSecondDigits: 0,
          }),
          repetitions: isNullish(params.repetitions)
            ? ''
            : `${params.repetitions}`,
          weight: isNullish(params.weight) ? '' : `${params.weight}`,
          distance: isNullish(params.distance) ? '' : `${params.distance}`,
          time: params.time ?? '',
          notes: params.notes ?? '',
        }}
        onSubmit={async (v) => {
          const epochSeconds = epochFromDateAndTime(
            v.executionDate,
            v.executionTime
          )

          await WorkoutSetService.create({
            exerciseId: params.exerciseId,
            repetitions: v.repetitions === '' ? null : Number(v.repetitions),
            weight:
              v.weight === '' ? null : Number(v.weight.replaceAll(',', '.')),
            distance: v.distance === '' ? null : Number(v.distance),
            time: v.time === '' ? null : v.time,
            executedAt: epochSeconds,
            notes: v.notes,
          })

          navigation.navigate('HistoryDayScreen', {
            date: v.executionDate,
            isEditing: false,
          })
        }}
      />
    </Screen>
  )
}
