import React, {useEffect, useState} from 'react'
import {Text} from '../../components/Text'
import {Screen} from '../../design/layout/Screen'
import {useRoute} from '@react-navigation/native'
import {ExerciseDetailScreenRouteProp} from '../exercises/types'
import {gql} from '@apollo/client'
import {
  useWorkoutSetForDayQuery,
  WorkoutSetForDayQuery,
} from '../../graphql/graphql.codegen'
import {HistoryDayScreenRouteProp} from './types'
import {groupBy, pipe, prop, sortBy} from 'ramda'
import {SectionList} from 'react-native'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'
import {SectionHeader} from '../../components/SectionHeader'

gql`
  query workoutSetForDay($date: String!) {
    workoutSetForDay(date: $date) {
      uuid
      executedAt

      repetitions
      weight
      time
      distance

      exercise {
        uuid
        name
      }
    }
  }
`

export const HistoryDayScreen = () => {
  const {params} = useRoute<HistoryDayScreenRouteProp>()
  const {data} = useWorkoutSetForDayQuery({
    variables: {
      date: params.date,
    },
  })
  const [setByExercise, setSetByExercise] = useState<
    {
      title: string
      data: WorkoutSetForDayQuery['workoutSetForDay']
    }[]
  >([])

  // Group exercises by muscle
  useEffect(() => {
    if (data?.workoutSetForDay) {
      const byExercise = groupBy(
        (ws) => ws.exercise.uuid,
        data.workoutSetForDay
      )

      setSetByExercise(
        pipe(sortBy(prop('title')))(
          Object.entries(byExercise).map(([exerciseUuid, workoutSets]) => ({
            title: workoutSets[0].exercise.name,
            data: workoutSets,
          }))
        )
      )
    }
  }, [data])

  return (
    <Screen>
      <SectionList
        sections={setByExercise}
        renderItem={({item}) => <WorkoutSetRow value={item} />}
        renderSectionHeader={(i) => (
          <SectionHeader>{i.section.title}</SectionHeader>
        )}
        keyExtractor={(item) => item.uuid}
      />
    </Screen>
  )
}
