import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {DateTime} from 'luxon'
import React from 'react'
import {Text} from 'react-native'
import {Screen} from '../../design/layout/Screen'
import {useExercise} from '../exercises/ExerciseService'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {WorkoutSetForm} from './WorkoutSetForm'
import {WorkoutSetService} from './WorkoutSetService'

type WorkoutSetAddScreenNavigationProp = RouteProp<
  MainStackNavigatorParamList,
  'WorkoutSetAddScreen'
>

export const WorkoutSetAddScreen: React.FC = () => {
  const {params} = useRoute<WorkoutSetAddScreenNavigationProp>()
  const navigation = useNavigation()
  const [exercise] = useExercise({
    uuid: params.exerciseUuid,
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
          executedAt: DateTime.now().toISO()!,
          repetitions: params.repetitions ? `${params.repetitions}` : '',
          weight: params.weight ? `${params.weight}` : '',
          distance: params.distance ? `${params.distance}` : '',
          time: params.time || '',
          notes: params.notes || '',
        }}
        onSubmit={async (v) => {
          await WorkoutSetService.create({
            exerciseUuid: params.exerciseUuid,
            repetitions: v.repetitions === '' ? null : Number(v.repetitions),
            weight:
              v.weight === '' ? null : Number(v.weight.replaceAll(',', '.')),
            distance: v.distance === '' ? null : Number(v.distance),
            time: v.time === '' ? null : v.time,
            executedAt: v.executedAt,
            notes: v.notes,
          })

          navigation.goBack()
        }}
      />
    </Screen>
  )
}
