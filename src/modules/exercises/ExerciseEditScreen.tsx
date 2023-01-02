import React from 'react'
import {Text} from 'react-native'
import {Button} from '../../components/Button'
import {Screen} from '../../design/layout/Screen'
import {ScrollView} from '../../design/layout/ScrollView'
import {ExerciseForm} from './ExerciseForm'
import {ExerciseService, useExercise} from './ExerciseService'
import {
  ExerciseEditScreenNavigationProp,
  ExerciseEditScreenRouteProp,
} from './types'

type Props = {
  navigation: ExerciseEditScreenNavigationProp
  route: ExerciseEditScreenRouteProp
}

export const ExerciseEditScreen: React.FC<Props> = ({navigation, route}) => {
  const [exercise] = useExercise({
    uuid: route.params.exerciseUuid,
    refreshOnFocus: false,
  })

  if (!exercise) {
    return <Text>Loading</Text>
  }

  return (
    <ScrollView>
      <Screen withPadding>
        <Text>EDITING</Text>
        <ExerciseForm
          initialValues={{
            name: exercise.name,
            description: exercise.description || '',
            hasRepetitions: exercise.hasRepetitions,
            hasWeight: exercise.hasWeight,
            hasTime: exercise.hasTime,
            hasDistance: exercise.hasDistance,
            muscle: exercise.muscle,
            isCardio: exercise.isCardio,
            isMachine: exercise.isMachine,
            isDumbbell: exercise.isDumbbell,
            isBarbell: exercise.isBarbell,
          }}
          onSubmit={async (values) => {
            try {
              await ExerciseService.update({
                uuid: route.params.exerciseUuid,
                data: values,
              })
              navigation.goBack()
            } catch (err) {
              alert('Update exercise error ' + err)
            }
          }}
        />

        <Button
          withTopMargin
          onPress={async () => {
            await ExerciseService.remove({uuid: route.params.exerciseUuid})
            navigation.replace('ExerciseListScreen')
          }}
        >
          Delete
        </Button>
      </Screen>
    </ScrollView>
  )
}
