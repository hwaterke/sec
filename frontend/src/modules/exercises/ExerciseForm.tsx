import React from 'react'
import {Button, View} from 'react-native'
import {TextInput} from '../../components/TextInput'
import {Formik} from 'formik'

export type FormValues = {
  name: string
  muscle: string
}

type Props = {
  initialValues?: FormValues
  onSubmit: (values: FormValues) => void | Promise<any>
}

export const ExerciseForm: React.FC<Props> = ({
  onSubmit,
  initialValues = {name: '', muscle: ''},
}) => {
  return (
    <Formik<FormValues> initialValues={initialValues} onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Name"
          />

          <TextInput
            onChangeText={handleChange('muscle')}
            onBlur={handleBlur('muscle')}
            value={values.muscle}
            placeholder="Muscle"
          />

          <Button onPress={handleSubmit as any} title="Submit" />
        </View>
      )}
    </Formik>
  )
}
