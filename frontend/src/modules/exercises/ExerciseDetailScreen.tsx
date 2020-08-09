import React from 'react'
import {Text, View} from 'react-native'
import {useRoute} from '@react-navigation/native'

export const ExerciseDetailScreen: React.FC = () => {
  const {params} = useRoute()

  return (
    <View>
      <Text>Hello</Text>

      <Text>{JSON.stringify(params, null, 2)}</Text>
    </View>
  )
}
