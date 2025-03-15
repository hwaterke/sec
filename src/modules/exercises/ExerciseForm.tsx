import {useForm} from '@tanstack/react-form'
import React from 'react'
import {Switch, Text, View} from 'react-native'
import {z} from 'zod'
import {Button} from '../../components/Button'
import {ErrorText, Label} from '../../components/Text'
import {Input, Textarea} from '../../components/TextInput'

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
    <View className="gap-2">
      <form.Field
        name="name"
        validators={{
          onBlur: z.string().min(1),
        }}
        children={(field) => {
          return (
            <View>
              <Label text="Name" />
              <Input
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                value={field.state.value}
                placeholder="Name"
                placeholderTextColor="grey"
              />
              {field.state.meta.errors.length ? (
                <ErrorText
                  text={field.state.meta.errors
                    .map((error) => error?.message)
                    .join(',')}
                />
              ) : null}
            </View>
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
            <View>
              <Label text="Description" />
              <Textarea
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                value={field.state.value}
                placeholder="Description"
                placeholderTextColor="grey"
                multiline
              />
              {field.state.meta.errors.length ? (
                <ErrorText
                  text={field.state.meta.errors
                    .map((error) => error?.message)
                    .join(',')}
                />
              ) : null}
            </View>
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
            <View>
              <Label text="Muscle" />
              <Input
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                value={field.state.value}
                placeholder="Muscle"
                placeholderTextColor="grey"
              />
              {field.state.meta.errors.length ? (
                <ErrorText
                  text={field.state.meta.errors
                    .map((error) => error?.message)
                    .join(',')}
                />
              ) : null}
            </View>
          )
        }}
      />

      <form.Field
        name="hasRepetitions"
        children={(field) => {
          return (
            <View className="flex-row justify-between items-center">
              <Text>Repetitions</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </View>
          )
        }}
      />
      <form.Field
        name="hasWeight"
        children={(field) => {
          return (
            <View className="flex-row justify-between items-center">
              <Text>Weight</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </View>
          )
        }}
      />
      <form.Field
        name="hasTime"
        children={(field) => {
          return (
            <View className="flex-row justify-between items-center">
              <Text>Time</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </View>
          )
        }}
      />
      <form.Field
        name="hasDistance"
        children={(field) => {
          return (
            <View className="flex-row justify-between items-center">
              <Text>Distance</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </View>
          )
        }}
      />
      <form.Field
        name="isCardio"
        children={(field) => {
          return (
            <View className="flex-row justify-between items-center">
              <Text>Cardio</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </View>
          )
        }}
      />
      <form.Field
        name="isMachine"
        children={(field) => {
          return (
            <View className="flex-row justify-between items-center">
              <Text>Machine</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </View>
          )
        }}
      />

      <form.Field
        name="isDumbbell"
        children={(field) => {
          return (
            <View className="flex-row justify-between items-center">
              <Text>Dumbbell</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </View>
          )
        }}
      />

      <form.Field
        name="isBarbell"
        children={(field) => {
          return (
            <View className="flex-row justify-between items-center">
              <Text>Barbell</Text>
              <Switch
                onValueChange={field.handleChange}
                value={field.state.value}
              />
            </View>
          )
        }}
      />

      <Button
        onPress={() => {
          void form.handleSubmit()
        }}
      >
        Save
      </Button>
    </View>
  )
}
