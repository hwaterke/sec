import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import React from 'react'
import {ScrollView} from 'react-native'
import {ExerciseService} from '../../services/ExerciseService'
import {ExerciseForm} from './ExerciseForm'

type Props = {
  navigation: NativeStackNavigationProp<{}>
}

export const ExerciseAddScreen: React.FC<Props> = ({navigation}) => {
  return (
    <ScrollView className="flex-1 bg-light-bg p-3">
      <ExerciseForm
        onSubmit={async (values) => {
          try {
            await ExerciseService.create(values)
            navigation.goBack()
          } catch (error) {
            alert(`Create exercise error ${error}`)
          }
        }}
      />
    </ScrollView>
  )
}
