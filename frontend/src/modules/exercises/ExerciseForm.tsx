import {Formik} from 'formik'
import React from 'react'
import {Switch, View} from 'react-native'
import styled from 'styled-components/native'
import {Button} from '../../components/Button'
import {Text} from '../../components/Text'
import {TextInput} from '../../components/TextInput'
import {py} from '../../design/constants/spacing'

const SwitchRow = styled.View`
  ${py(1)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

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

          <SwitchRow>
            <Text>Repetitions</Text>
            <Switch
              onValueChange={(value) => {
                setFieldValue('hasRepetitions', value)
              }}
              value={values.hasRepetitions}
            />
          </SwitchRow>

          <SwitchRow>
            <Text>Weight</Text>
            <Switch
              onValueChange={(value) => {
                setFieldValue('hasWeight', value)
              }}
              value={values.hasWeight}
            />
          </SwitchRow>

          <SwitchRow>
            <Text>Time</Text>
            <Switch
              onValueChange={(value) => {
                setFieldValue('hasTime', value)
              }}
              value={values.hasTime}
            />
          </SwitchRow>

          <SwitchRow>
            <Text>Distance</Text>
            <Switch
              onValueChange={(value) => {
                setFieldValue('hasDistance', value)
              }}
              value={values.hasDistance}
            />
          </SwitchRow>

          <SwitchRow>
            <Text>isCardio</Text>
            <Switch
              onValueChange={(value) => {
                setFieldValue('isCardio', value)
              }}
              value={values.isCardio}
            />
          </SwitchRow>

          <SwitchRow>
            <Text>isMachine</Text>
            <Switch
              onValueChange={(value) => {
                setFieldValue('isMachine', value)
              }}
              value={values.isMachine}
            />
          </SwitchRow>

          <SwitchRow>
            <Text>isDumbbell</Text>
            <Switch
              onValueChange={(value) => {
                setFieldValue('isDumbbell', value)
              }}
              value={values.isDumbbell}
            />
          </SwitchRow>

          <SwitchRow>
            <Text>isBarbell</Text>
            <Switch
              onValueChange={(value) => {
                setFieldValue('isBarbell', value)
              }}
              value={values.isBarbell}
            />
          </SwitchRow>

          <Button onPress={handleSubmit as any} withTopMargin>
            Save
          </Button>
        </View>
      )}
    </Formik>
  )
}
