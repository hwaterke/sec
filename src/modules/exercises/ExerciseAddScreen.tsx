import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import React from 'react'
import {Screen} from '../../design/layout/Screen'
import {ScrollView} from '../../design/layout/ScrollView'
import {ExerciseForm} from './ExerciseForm'
import {ExerciseService} from './ExerciseService'

type Props = {
  navigation: NativeStackNavigationProp<{}>
}

export const ExerciseAddScreen: React.FC<Props> = ({navigation}) => {
  return (
    <ScrollView>
      <Screen withPadding>
        <ExerciseForm
          onSubmit={async (values) => {
            try {
              await ExerciseService.create(values)
              navigation.goBack()
            } catch (err) {
              alert('Create exercise error ' + err)
            }
          }}
        />
      </Screen>
    </ScrollView>
  )
}
