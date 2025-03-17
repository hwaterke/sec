import {router} from 'expo-router'
import {ScrollView} from 'react-native'
import {ExerciseForm} from '../../../../modules/exercises/ExerciseForm'
import {ExerciseService} from '../../../../services/ExerciseService'

export default function ExerciseAddScreen() {
  return (
    <ScrollView className="flex-1 bg-light-bg p-3">
      <ExerciseForm
        onSubmit={async (values) => {
          try {
            await ExerciseService.create(values)
            router.back()
          } catch (error) {
            alert(`Create exercise error ${error}`)
          }
        }}
      />
    </ScrollView>
  )
}
