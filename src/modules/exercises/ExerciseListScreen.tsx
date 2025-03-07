import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {groupBy, pipe, prop, sortBy} from 'ramda'
import React, {useCallback, useEffect, useState} from 'react'
import {SectionList, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {SectionHeader} from '../../components/SectionHeader'
import {px, py} from '../../design/constants/spacing'
import {ExerciseService} from '../../services/ExerciseService'
import {ExerciseListScreenNavigationProp} from './types'
import {Exercise} from '../../database/schema'

const Row = styled.View`
  flex-direction: row;
  ${px(4)};
  ${py(4)};
  align-items: center;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.colors.background.row};
  border-bottom-color: #e5e5e5;
  border-bottom-width: 0.5px;
`

const RowText = styled.Text`
  color: ${({theme}) => theme.colors.text.primary};
`

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
    const byMuscle = groupBy((exercise) => exercise.muscle, exercises)

    setExercisesByMuscle(
      pipe(sortBy(prop('title')))(
        Object.entries(byMuscle).map(([muscle, exercises]) => ({
          title: muscle,
          data: exercises!,
        }))
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
          <Row>
            <RowText>{item.name}</RowText>
          </Row>
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
