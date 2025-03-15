import {NavigationProp} from '@react-navigation/core/src/types'
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native'
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {SectionList, TouchableOpacity, View} from 'react-native'
import {groupBy} from 'remeda'
import styled from 'styled-components/native'
import {SectionHeader} from '../../components/SectionHeader'
import {Text} from '../../components/Text'
import {TimeSince} from '../../components/TimeSince'
import {WorkoutSetRow} from '../../components/WorkoutSetRow'
import {WorkoutSetWithExercise} from '../../database/schema'
import {py} from '../../design/constants/spacing'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {globalScreenOptions} from '../../theming/globalScreenOption'
import {theme} from '../../theming/theme'
import {
  formatDate,
  formatEpochTime,
  formatTimeBetween,
} from '../../utils/formatters'
import {MainStackNavigatorParamList} from '../home/MainStackNavigator'
import {HistoryDayScreenRouteProp} from './types'

const SummaryView = styled.View`
  background-color: ${theme.colors.background.row};
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
  color: ${theme.colors.text.secondary};
`

const StatsValue = styled(Text)`
  font-size: 20px;
`

export const HistoryDayScreen = () => {
  const {params} = useRoute<HistoryDayScreenRouteProp>()

  const navigation =
    useNavigation<NavigationProp<MainStackNavigatorParamList>>()
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
    }, [params.date])
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
  }, [navigation, params.isEditing])

  if (workoutSets.length === 0) {
    return (
      <View className="flex-1 bg-light-bg">
        <Text>Nothing on that day</Text>
      </View>
    )
  }

  return (
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
  )
}
