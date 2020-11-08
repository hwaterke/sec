import React from 'react'
import {Button, Text, View} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'

export const ExerciseDetailScreen: React.FC = () => {
  const {params} = useRoute()
  const navigation = useNavigation()

  return (
    <View>
      <Text>Hello</Text>

      <Text>{JSON.stringify(params, null, 2)}</Text>

      <Text>Add SET</Text>

      <Button
        title="Add a set"
        onPress={() => {
          navigation.navigate('WorkoutSetAddScreen', {
            exerciseUuid: params.exerciseUuid,
          })
        }}
      />
    </View>
  )
}
