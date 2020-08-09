import React, {useEffect, useState} from 'react'
import {SectionList, Text, TouchableOpacity, View} from 'react-native'
import {ExercisesQuery, useExercisesQuery} from '../../graphql/graphql.codegen'
import {groupBy, pipe, prop, sortBy} from 'ramda'
import {SectionHeader} from '../../components/SectionHeader'
import {useNavigation} from '@react-navigation/native'

export const ExerciseListScreen: React.FC = () => {
  const navigation = useNavigation()
  const {data, loading, refetch} = useExercisesQuery()

  const [exercisesByMuscle, setExercisesByMuscle] = useState<
    {title: string; data: ExercisesQuery['exercises']}[]
  >([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  // Group exercises by muscle
  useEffect(() => {
    if (data?.exercises) {
      const byMuscle = groupBy(prop('muscle'), data.exercises)

      setExercisesByMuscle(
        pipe(sortBy(prop('title')))(
          Object.entries(byMuscle).map(([muscle, exercises]) => ({
            title: muscle,
            data: exercises,
          }))
        )
      )
    }
  }, [data])

  if (loading || !data) {
    return <Text>Loading</Text>
  }

  return (
    <SectionList
      refreshing={refreshing}
      onRefresh={async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
      }}
      style={{flex: 1}}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ExerciseDetailScreen', {
              exerciseUuid: item.uuid,
            })
          }
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
      renderSectionHeader={({section: {title}}) => (
        <SectionHeader>{title}</SectionHeader>
      )}
      keyExtractor={(item) => item.uuid}
      sections={exercisesByMuscle}
    />
  )
}
