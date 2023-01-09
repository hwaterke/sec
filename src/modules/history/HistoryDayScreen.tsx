import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native'
import {DateTime} from 'luxon'
import {groupBy} from 'ramda'
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {SectionList, TouchableOpacity} from 'react-native'
import {useTheme} from 'styled-components'
import styled from 'styled-components/native'
import {SectionHeader} from '../../components/SectionHeader'
import {Text} from '../../components/Text'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'
import {WorkoutSet} from '../../database/entities/workout_set.entity'
import {py} from '../../design/constants/spacing'
import {Screen} from '../../design/layout/Screen'
import {globalScreenOptions} from '../../theming/globalScreenOption'
import {WorkoutSetService} from '../workoutSet/WorkoutSetService'
import {HistoryDayScreenRouteProp} from './types'

const SummaryView = styled.View`
  background-color: ${({theme}) => theme.colors.background.row};
`

const SummaryTitleView = styled.View`
  ${py(2)};
  align-items: center;
`

const SummaryTitle = styled(Text)`
  font-size: 20px;
`

const TimeView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const Stats = styled.View`
  ${py(2)}
  align-items: center;
`

const StatsTitle = styled(Text)`
  color: ${({theme}) => theme.colors.text.secondary};
`

const StatsValue = styled(Text)`
  font-size: 20px;
`

export const HistoryDayScreen = () => {
  const {params} = useRoute<HistoryDayScreenRouteProp>()
  const navigation = useNavigation()
  const theme = useTheme()
  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([])

  const [setByExercise, setSetByExercise] = useState<
    {
      title: string
      data: WorkoutSet[]
    }[]
  >([])

  useFocusEffect(
    useCallback(() => {
      const main = async () => {
        const data = await WorkoutSetService.workoutSetsForDay({
          date: params.date,
        })
        setWorkoutSets(data)
      }
      main()
    }, [])
  )

  useEffect(() => {
    if (workoutSets) {
      const byExercise = groupBy((ws) => ws.exercise.uuid, workoutSets)

      setSetByExercise(
        Object.entries(byExercise).map(([exerciseUuid, workoutSets]) => ({
          title: workoutSets[0].exercise.name,
          data: workoutSets,
        }))
      )
    }
  }, [workoutSets])

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

  if (workoutSets.length === 0) {
    return (
      <Screen withPadding>
        <Text>Nothing on that day</Text>
      </Screen>
    )
  }

  const timeStart = DateTime.fromJSDate(workoutSets[0].executedAt)
  const timeEnd = DateTime.fromJSDate(
    workoutSets[workoutSets.length - 1].executedAt
  )
  const duration = Math.round(timeEnd.diff(timeStart, 'minutes').minutes)

  return (
    <Screen>
      <SectionList
        ListHeaderComponent={() => {
          return (
            <SummaryView>
              <SummaryTitleView>
                <SummaryTitle>
                  {DateTime.fromISO(params.date).toLocaleString(
                    DateTime.DATE_MED_WITH_WEEKDAY
                  )}
                </SummaryTitle>

                <StatsTitle>
                  {duration > 60
                    ? `${duration % 60}h ${Math.floor(duration / 60)}m`
                    : `${duration}m`}
                </StatsTitle>
              </SummaryTitleView>

              <TimeView>
                <Stats>
                  <StatsValue>
                    {timeStart.toLocaleString(DateTime.TIME_24_SIMPLE)}
                  </StatsValue>
                  <StatsTitle>START</StatsTitle>
                </Stats>

                <Stats>
                  <StatsValue>
                    {timeEnd.toLocaleString(DateTime.TIME_24_SIMPLE)}
                  </StatsValue>
                  <StatsTitle>END</StatsTitle>
                </Stats>
              </TimeView>
            </SummaryView>
          )
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
                    exerciseUuid: item.exerciseUuid,
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