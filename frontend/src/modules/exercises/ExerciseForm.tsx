import React from 'react'
import {Button, Text, View, Switch} from 'react-native'
import {TextInput} from '../../components/TextInput'
import {Formik} from 'formik'

export type FormValues = {
  name: string
  description: string
  hasRepetitions: boolean
  hasWeight: boolean
  hasTime: boolean
  hasDistance: boolean
  muscle: string
  isCardio: boolean
  isMachine: boolean
  isDumbbell: boolean
  isBarbell: boolean
}

type Props = {
  initialValues?: FormValues
  onSubmit: (values: FormValues) => void | Promise<any>
}

export const ExerciseForm: React.FC<Props> = ({
  onSubmit,
  initialValues = {
    name: '',
    description: '',
    hasRepetitions: false,
    hasWeight: false,
    hasTime: false,
    hasDistance: false,
    muscle: '',
    isCardio: false,
    isMachine: false,
    isDumbbell: false,
    isBarbell: false,
  },
}) => {
  return (
    <Formik<FormValues> initialValues={initialValues} onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
        <View>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Name"
          />
          <TextInput
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            placeholder="Description"
            multiline
          />
          <TextInput
            onChangeText={handleChange('muscle')}
            onBlur={handleBlur('muscle')}
            value={values.muscle}
            placeholder="Muscle"
          />

          <Text>Repetitions</Text>
          <Switch
            onValueChange={(value) => {
              setFieldValue('hasRepetitions', value)
            }}
            value={values.hasRepetitions}
          />

          <Text>Weight</Text>
          <Switch
            onValueChange={(value) => {
              setFieldValue('hasWeight', value)
            }}
            value={values.hasWeight}
          />

          <Text>Time</Text>
          <Switch
            onValueChange={(value) => {
              setFieldValue('hasTime', value)
            }}
            value={values.hasTime}
          />

          <Text>Distance</Text>
          <Switch
            onValueChange={(value) => {
              setFieldValue('hasDistance', value)
            }}
            value={values.hasDistance}
          />

          <Text>isCardio</Text>
          <Switch
            onValueChange={(value) => {
              setFieldValue('isCardio', value)
            }}
            value={values.isCardio}
          />
          <Text>isMachine</Text>
          <Switch
            onValueChange={(value) => {
              setFieldValue('isMachine', value)
            }}
            value={values.isMachine}
          />
          <Text>isDumbbell</Text>
          <Switch
            onValueChange={(value) => {
              setFieldValue('isDumbbell', value)
            }}
            value={values.isDumbbell}
          />
          <Text>isBarbell</Text>
          <Switch
            onValueChange={(value) => {
              setFieldValue('isBarbell', value)
            }}
            value={values.isBarbell}
          />

          <Button onPress={handleSubmit as any} title="Submit" />
        </View>
      )}
    </Formik>
  )
}
