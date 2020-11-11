import React from 'react'
import {Button, View} from 'react-native'
import {TextInput} from '../../components/TextInput'
import {Formik} from 'formik'

export type WorkoutSetFormValues = {
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
  initialValues?: WorkoutSetFormValues
  onSubmit: (values: WorkoutSetFormValues) => void | Promise<any>
}

export const WorkoutSetForm = ({
  exercise,
  onSubmit,
  initialValues = {repetitions: '', weight: '', distance: '', time: ''},
}: Props) => {
  return (
    <Formik<WorkoutSetFormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          {exercise.hasRepetitions && (
            <TextInput
              onChangeText={handleChange('repetitions')}
              onBlur={handleBlur('repetitions')}
              value={values.repetitions}
              placeholder="Repetitions"
              keyboardType="numeric"
            />
          )}

          {exercise.hasWeight && (
            <TextInput
              onChangeText={handleChange('weight')}
              onBlur={handleBlur('weight')}
              value={values.weight}
              placeholder="Weight"
              keyboardType="numeric"
            />
          )}

          {exercise.hasDistance && (
            <TextInput
              onChangeText={handleChange('distance')}
              onBlur={handleBlur('distance')}
              value={values.distance}
              placeholder="Distance"
              keyboardType="numeric"
            />
          )}

          {exercise.hasTime && (
            <TextInput
              onChangeText={handleChange('time')}
              onBlur={handleBlur('time')}
              value={values.time}
              placeholder="Time"
            />
          )}

          <Button onPress={handleSubmit as any} title="Submit" />
        </View>
      )}
    </Formik>
  )
}
