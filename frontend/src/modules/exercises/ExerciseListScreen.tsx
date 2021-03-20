import {gql} from '@apollo/client'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {groupBy, pipe, prop, sortBy} from 'ramda'
import React, {useCallback, useEffect, useState} from 'react'
import {SectionList, Text, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {SectionHeader} from '../../components/SectionHeader'
import {px, py} from '../../design/constants/spacing'
import {
  ExercisesQuery,
  useExercisesLazyQuery,
} from '../../graphql/graphql.codegen'

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

gql`
  query exercises {
    exercises {
      uuid
      name
      muscle
    }
  }
`

export const ExerciseListScreen: React.FC = () => {
  const navigation = useNavigation()
  const [fetch, {data, loading, refetch}] = useExercisesLazyQuery()
  const [exercisesByMuscle, setExercisesByMuscle] = useState<
    {title: string; data: ExercisesQuery['exercises']}[]
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

  if (!data) {
    return <Text>No data</Text>
  }

  return (
    <SectionList
      refreshing={loading}
      onRefresh={async () => {
        await refetch?.()
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
          <Row>
            <RowText>{item.name}</RowText>
          </Row>
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
