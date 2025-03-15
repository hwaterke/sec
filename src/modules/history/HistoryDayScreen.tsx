import {NavigationProp} from '@react-navigation/core/src/types'
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native'
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {SectionList, TouchableOpacity} from 'react-native'
import {groupBy} from 'remeda'
import {useTheme} from 'styled-components'
import styled from 'styled-components/native'
import {SectionHeader} from '../../components/SectionHeader'
import {Text} from '../../components/Text'
import {TimeSince} from '../../components/TimeSince'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'
import {WorkoutSetWithExercise} from '../../database/schema'
import {py} from '../../design/constants/spacing'
import {Screen} from '../../design/layout/Screen'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {globalScreenOptions} from '../../theming/globalScreenOption'
import {
  formatDate,
  formatEpochTime,
  formatTimeBetween,
} from '../../utils/formatters'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
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

  const navigation =
    useNavigation<NavigationProp<MainStackNavigatorParamList>>()
  const theme = useTheme()
  const [workoutSets, setWorkoutSets] = useState<WorkoutSetWithExercise[]>([])

  const [setByExercise, setSetByExercise] = useState<
    {
      title: string
      data: WorkoutSetWithExercise[]
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
      void main()
    }, [])
  )

  useEffect(() => {
    const byExercise = groupBy(workoutSets, (ws) => ws.exerciseId)

    setSetByExercise(
      Object.entries(byExercise).map(([exerciseId, workoutSets]) => ({
        title: workoutSets[0].exercise.name,
        data: workoutSets,
      }))
    )
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

  return (
    <Screen>
      <SectionList
        ListHeaderComponent={() => {
          return (
            <SummaryView>
              <SummaryTitleView>
                <SummaryTitle>{formatDate(params.date)}</SummaryTitle>

                <StatsTitle>
                  {formatTimeBetween(
                    workoutSets[0].executedAt,
                    workoutSets[workoutSets.length - 1].executedAt
                  )}
                </StatsTitle>
              </SummaryTitleView>

              <TimeView>
                <Stats>
                  <StatsValue>
                    {formatEpochTime(workoutSets[0].executedAt)}
                  </StatsValue>
                  <StatsTitle>START</StatsTitle>
                </Stats>

                <Stats>
                  <StatsValue>
                    {formatEpochTime(
                      workoutSets[workoutSets.length - 1].executedAt
                    )}
                  </StatsValue>
                  <StatsTitle>END</StatsTitle>
                </Stats>
              </TimeView>

              <TimeView>
                <Stats>
                  <StatsValue>
                    <TimeSince
                      timestamp={workoutSets[workoutSets.length - 1].executedAt}
                    />
                  </StatsValue>
                  <StatsTitle>Time since last exercise</StatsTitle>
                </Stats>
              </TimeView>
            </SummaryView>
          )
        }}
        sections={setByExercise}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              params.isEditing
                ? navigation.navigate('WorkoutSetEditScreen', {
                    workoutSetId: item.id,
                  })
                : navigation.navigate('WorkoutSetAddScreen', {
                    exerciseId: item.exerciseId,
                    repetitions: item.repetitions ?? undefined,
                    weight: item.weight ?? undefined,
                    distance: item.distance ?? undefined,
                    time: item.time ?? undefined,
                  })
            }}
          >
            <WorkoutSetRow value={item} />
          </TouchableOpacity>
        )}
        renderSectionHeader={(i) => (
          <SectionHeader>{i.section.title}</SectionHeader>
        )}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  )
}
