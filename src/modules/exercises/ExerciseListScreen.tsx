import {useFocusEffect, useNavigation} from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from 'react'
import {SectionList, Text, TouchableOpacity, View} from 'react-native'
import {groupBy, sortBy} from 'remeda'
import {SectionHeader} from '../../components/SectionHeader'
import {Exercise} from '../../database/schema'
import {ExerciseService} from '../../services/ExerciseService'
import {ExerciseListScreenNavigationProp} from './types'

export const ExerciseListScreen: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const navigation = useNavigation<ExerciseListScreenNavigationProp>()
  const [exercisesByMuscle, setExercisesByMuscle] = useState<
    {title: string; data: Exercise[]}[]
  >([])

  useFocusEffect(
    useCallback(() => {
      const main = async () => {
        const data = await ExerciseService.getAll()
        setExercises(data)
      }
      void main()
    }, [])
  )

  // Group exercises by muscle
  useEffect(() => {
    const byMuscle = groupBy(exercises, (exercise) => exercise.muscle ?? '')

    setExercisesByMuscle(
      sortBy(
        Object.entries(byMuscle).map(([muscle, exercises]) => ({
          title: muscle,
          data: exercises,
        })),
        (item) => item.title
      )
    )
  }, [exercises])

  return (
    <SectionList
      style={{flex: 1}}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ExerciseDetailScreen', {
              exerciseId: item.id,
            })
          }}
        >
          <View className="flex flex-row items-center p-4 bg-white border-b border-gray-200">
            <Text className="text-gray-900">{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      renderSectionHeader={({section: {title}}) => (
        <SectionHeader>{title}</SectionHeader>
      )}
      keyExtractor={(item) => item.id}
      sections={exercisesByMuscle}
    />
  )
}
