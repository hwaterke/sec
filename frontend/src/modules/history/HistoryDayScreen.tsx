import {gql} from '@apollo/client'
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native'
import {groupBy, pipe, prop, sortBy} from 'ramda'
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {SectionList, TouchableOpacity} from 'react-native'
import {useTheme} from 'styled-components'
import {SectionHeader} from '../../components/SectionHeader'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'
import {Screen} from '../../design/layout/Screen'
import {
  useWorkoutSetForDayLazyQuery,
  WorkoutSetForDayQuery,
} from '../../graphql/graphql.codegen'
import {globalScreenOptions} from '../../theming/globalScreenOption'
import {HistoryDayScreenRouteProp} from './types'

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
  const navigation = useNavigation()
  const theme = useTheme()
  const [fetch, {data, loading, refetch}] = useWorkoutSetForDayLazyQuery({
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

  useFocusEffect(
    useCallback(() => {
      if (refetch) {
        void refetch()
      } else {
        fetch()
      }
    }, [fetch, refetch])
  )

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        ...globalScreenOptions.headerStyle,
        backgroundColor: params.isEditing
          ? theme.colors.background.editing
          : theme.navigation.colors.card,
      },
    })
  }, [navigation, params.isEditing, theme])

  return (
    <Screen>
      <SectionList
        refreshing={loading}
        onRefresh={async () => {
          await refetch?.()
        }}
        sections={setByExercise}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.uuid}
            onPress={() => {
              params.isEditing
                ? navigation.navigate('WorkoutSetEditScreen', {
                    workoutSetUuid: item.uuid,
                  })
                : navigation.navigate('WorkoutSetAddScreen', {
                    exerciseUuid: item.exercise.uuid,
                    repetitions: item.repetitions,
                    weight: item.weight,
                    distance: item.distance,
                    time: item.time,
                  })
            }}
          >
            <WorkoutSetRow value={item} />
          </TouchableOpacity>
        )}
        renderSectionHeader={(i) => (
          <SectionHeader>{i.section.title}</SectionHeader>
        )}
        keyExtractor={(item) => item.uuid}
      />
    </Screen>
  )
}
