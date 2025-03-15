import {useForm} from '@tanstack/react-form'
import React from 'react'
import {Switch} from 'react-native'
import styled from 'styled-components/native'
import {Button} from '../../components/Button'
import {ErrorText, Text} from '../../components/Text'
import {TextInput} from '../../components/TextInput'
import {py} from '../../design/constants/spacing'
import {z} from 'zod'

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
  onSubmit: (values: FormValues) => Promise<any>
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
  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({value}) => {
      await onSubmit(value)
    },
  })

  return (
    <>
      <form.Field
        name="name"
        validators={{
          onBlur: z.string().min(1),
        }}
        children={(field) => {
          return (
            <>
              <TextInput
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                value={field.state.value}
                placeholder="Name"
                placeholderTextColor="grey"
              />
              {field.state.meta.errors.length ? (
                <ErrorText>
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join(',')}
                </ErrorText>
              ) : null}
            </>
          )
        }}
      />

      <form.Field
        name="description"
        validators={{
          onBlur: z.string(),
        }}
        children={(field) => {
          return (
            <>
              <TextInput
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                value={field.state.value}
                placeholder="Description"
                placeholderTextColor="grey"
                multiline
              />
              {field.state.meta.errors.length ? (
                <ErrorText>
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join(',')}
                </ErrorText>
              ) : null}
            </>
          )
        }}
      />

      <form.Field
        name="muscle"
        validators={{
          onBlur: z.string(),
        }}
        children={(field) => {
          return (
            <>
              <TextInput
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                value={field.state.value}
                placeholder="Muscle"
                placeholderTextColor="grey"
              />
              {field.state.meta.errors.length ? (
                <ErrorText>
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join(',')}
                </ErrorText>
              ) : null}
            </>
          )
        }}
      />

      <form.Field
        name="hasRepetitions"
        children={(field) => {
          return (
            <SwitchRow>
              <Text>Repetitions</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </SwitchRow>
          )
        }}
      />
      <form.Field
        name="hasWeight"
        children={(field) => {
          return (
            <SwitchRow>
              <Text>Weight</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </SwitchRow>
          )
        }}
      />
      <form.Field
        name="hasTime"
        children={(field) => {
          return (
            <SwitchRow>
              <Text>Time</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </SwitchRow>
          )
        }}
      />
      <form.Field
        name="hasDistance"
        children={(field) => {
          return (
            <SwitchRow>
              <Text>Distance</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </SwitchRow>
          )
        }}
      />
      <form.Field
        name="isCardio"
        children={(field) => {
          return (
            <SwitchRow>
              <Text>Cardio</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </SwitchRow>
          )
        }}
      />
      <form.Field
        name="isMachine"
        children={(field) => {
          return (
            <SwitchRow>
              <Text>Machine</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </SwitchRow>
          )
        }}
      />

      <form.Field
        name="isDumbbell"
        children={(field) => {
          return (
            <SwitchRow>
              <Text>Dumbbell</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </SwitchRow>
          )
        }}
      />

      <form.Field
        name="isBarbell"
        children={(field) => {
          return (
            <SwitchRow>
              <Text>Barbell</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </SwitchRow>
          )
        }}
      />

      <Button
        onPress={() => {
          void form.handleSubmit()
        }}
        withTopMargin
      >
        Save
      </Button>
    </>
  )
}
