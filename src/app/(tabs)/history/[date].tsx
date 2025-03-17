import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from 'expo-router'
import React, {useCallback, useEffect, useState} from 'react'
import {SectionList, Text, TouchableOpacity, View} from 'react-native'
import {groupBy} from 'remeda'
import {SectionHeader} from '../../../components/SectionHeader'
import {TimeSince} from '../../../components/TimeSince'
import {WorkoutSetRow} from '../../../components/WorkoutSetRow'
import {WorkoutSetWithExercise} from '../../../database/schema'
import {WorkoutSetService} from '../../../services/WorkoutSetService'
import {globalScreenOptions} from '../../../theming/globalScreenOption'
import {theme} from '../../../theming/theme'
import {
  formatDate,
  formatEpochTime,
  formatTimeBetween,
} from '../../../utils/formatters'
import {TextButton} from '../../../components/TextButton'

export default function HistoryDayScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{date: string; isEditing?: string}>()
  const date = params.date
  const isEditing = params.isEditing === 'true'

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
          date,
        })
        setWorkoutSets(data)
      }
      void main()
    }, [date])
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

  if (workoutSets.length === 0) {
    return (
      <View className="flex-1 bg-light-bg">
        <Text>Nothing on that day</Text>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: date,
          headerStyle: {
            ...globalScreenOptions.headerStyle,
            backgroundColor: isEditing
              ? theme.colors.background.editing
              : theme.navigation.colors.card,
          },
          headerRight: () => (
            <TextButton
              title={isEditing ? 'Done' : 'Edit'}
              onPress={() => {
                router.setParams({isEditing: isEditing ? 'false' : 'true'})
              }}
            />
          ),
        }}
      />
      <SectionList
        ListHeaderComponent={() => {
          return (
            <View className="px-4 py-2 bg-white gap-2">
              <Text className="text-xl font-bold">{formatDate(date)}</Text>
              <View className="flex-row justify-between">
                <View className="flex-row">
                  <Text className="text-gray-500">Total time: </Text>
                  <Text className="font-bold">
                    {formatTimeBetween(
                      workoutSets[0].executedAt,
                      workoutSets[workoutSets.length - 1].executedAt
                    )}
                  </Text>
                </View>
                <View className="flex-row">
                  <Text className="text-gray-500">From </Text>
                  <Text className="font-bold">
                    {formatEpochTime(workoutSets[0].executedAt)}
                  </Text>
                  <Text className="text-gray-500"> to </Text>
                  <Text className="font-bold">
                    {formatEpochTime(
                      workoutSets[workoutSets.length - 1].executedAt
                    )}
                  </Text>
                </View>
              </View>

              <View className="items-center justify-around">
                <Text className="text-2xl font-bold">
                  <TimeSince
                    timestamp={workoutSets[workoutSets.length - 1].executedAt}
                  />
                </Text>
                <Text className="text-gray-500">Time since last exercise</Text>
              </View>
            </View>
          )
        }}
        sections={setByExercise}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              router.navigate(
                isEditing
                  ? {
                      pathname: '/workout-set/[id]/edit',
                      params: {
                        id: item.id,
                      },
                    }
                  : {
                      pathname: '/workout-set/[exerciseid]/add',
                      params: {
                        exerciseid: item.exerciseId,
                        repetitions: item.repetitions ?? undefined,
                        weight: item.weight ?? undefined,
                        distance: item.distance ?? undefined,
                        time: item.time ?? undefined,
                      },
                    }
              )
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
    </>
  )
}
