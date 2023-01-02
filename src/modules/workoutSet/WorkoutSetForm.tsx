import {Formik} from 'formik'
import React from 'react'
import {View} from 'react-native'
import {Button} from '../../components/Button'
import {TextInput} from '../../components/TextInput'

export type WorkoutSetFormValues = {
  executedAt: string
  repetitions: string
  weight: string
  distance: string
  time: string
}

type Props = {
  exercise: {
    hasRepetitions: boolean
    hasWeight: boolean
    hasDistance: boolean
    hasTime: boolean
  }
  initialValues: WorkoutSetFormValues
  onSubmit: (values: WorkoutSetFormValues) => void | Promise<any>
}

export const WorkoutSetForm = ({exercise, onSubmit, initialValues}: Props) => {
  return (
    <Formik<WorkoutSetFormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <TextInput
            onChangeText={handleChange('executedAt')}
            onBlur={handleBlur('executedAt')}
            value={values.executedAt}
            placeholder="Executed at"
            placeholderTextColor="grey"
          />

          {exercise.hasRepetitions && (
            <TextInput
              onChangeText={handleChange('repetitions')}
              onBlur={handleBlur('repetitions')}
              value={values.repetitions}
              placeholder="Repetitions"
              keyboardType="numeric"
              placeholderTextColor="grey"
            />
          )}

          {exercise.hasWeight && (
            <TextInput
              onChangeText={handleChange('weight')}
              onBlur={handleBlur('weight')}
              value={values.weight}
              placeholder="Weight"
              keyboardType="numeric"
              placeholderTextColor="grey"
            />
          )}

          {exercise.hasDistance && (
            <TextInput
              onChangeText={handleChange('distance')}
              onBlur={handleBlur('distance')}
              value={values.distance}
              placeholder="Distance"
              keyboardType="numeric"
              placeholderTextColor="grey"
            />
          )}

          {exercise.hasTime && (
            <TextInput
              onChangeText={handleChange('time')}
              onBlur={handleBlur('time')}
              value={values.time}
              placeholder="Time"
              placeholderTextColor="grey"
            />
          )}

          <Button onPress={handleSubmit as any} withTopMargin>
            Save
          </Button>
        </View>
      )}
    </Formik>
  )
}
