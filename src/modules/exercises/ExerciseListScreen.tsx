import {Ionicons} from '@expo/vector-icons'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from 'react'
import {SectionList, Text, TouchableOpacity, View} from 'react-native'
import {groupBy, sortBy} from 'remeda'
import {SectionHeader} from '../../components/SectionHeader'
import {Input} from '../../components/TextInput'
import {Exercise} from '../../database/schema'
import {ExerciseService} from '../../services/ExerciseService'
import {ExerciseListScreenNavigationProp} from './types'

export const ExerciseListScreen: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [searchText, setSearchText] = useState('')
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

  // Group exercises by muscle and filter by search text
  useEffect(() => {
    const filteredExercises = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchText.toLowerCase())
    )

    const byMuscle = groupBy(
      filteredExercises,
      (exercise) => exercise.muscle ?? ''
    )

    setExercisesByMuscle(
      sortBy(
        Object.entries(byMuscle).map(([muscle, exercises]) => ({
          title: muscle,
          data: exercises,
        })),
        (item) => item.title
      )
    )
  }, [exercises, searchText])

  return (
    <View style={{flex: 1}}>
      <View className="flex-row p-2 items-center bg-white">
        <View className="flex-1">
          <Input
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search exercises..."
            placeholderTextColor="grey"
          />
        </View>
        {searchText !== '' && (
          <TouchableOpacity
            className="p-2"
            onPress={() => {
              setSearchText('')
            }}
          >
            <Ionicons name="close-circle" size={24} color="#666666" />
          </TouchableOpacity>
        )}
      </View>
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
    </View>
  )
}
