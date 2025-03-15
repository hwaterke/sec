import {useForm} from '@tanstack/react-form'
import React from 'react'
import {z} from 'zod'
import {Button} from '../../components/Button'
import {ErrorText, Label} from '../../components/Text'
import {Input, Textarea} from '../../components/TextInput'
import {View, Text} from 'react-native'

export type WorkoutSetFormValues = {
  executionDate: string
  executionTime: string
  repetitions: string
  weight: string
  distance: string
  time: string
  notes: string
}

type Props = {
  exercise: {
    name: string
    hasRepetitions: boolean
    hasWeight: boolean
    hasDistance: boolean
    hasTime: boolean
  }
  initialValues: WorkoutSetFormValues
  onSubmit: (values: WorkoutSetFormValues) => Promise<any>
}

export const WorkoutSetForm = ({exercise, onSubmit, initialValues}: Props) => {
  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({value}) => {
      await onSubmit(value)
    },
  })

  return (
    <View className="gap-3">
      <Text className="text-2xl">{exercise.name}</Text>

      <View className="flex-row gap-2">
        <View className="flex-1">
          <Label text="Execution date" />
          <form.Field
            name="executionDate"
            validators={{
              onBlur: z
                .string()
                .refine((value) => /^\d{4}-[01]\d-\d{2}$/.test(value), {
                  message: 'Must be a valid date in the format YYYY-MM-DD',
                }),
            }}
            children={(field) => {
              return (
                <>
                  <Input
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Execution date"
                    placeholderTextColor="grey"
                  />
                  {field.state.meta.errors.length ? (
                    <ErrorText
                      text={field.state.meta.errors
                        .map((error) => error?.message)
                        .join(',')}
                    />
                  ) : null}
                </>
              )
            }}
          />
        </View>

        <View className="flex-1">
          <Label text="Execution time" />
          <form.Field
            name="executionTime"
            validators={{
              onBlur: z
                .string()
                .refine((value) => /^\d{2}:\d{2}:\d{2}$/.test(value), {
                  message: 'Must be a valid time in the format HH:MM:SS',
                }),
            }}
            children={(field) => {
              return (
                <>
                  <Input
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Execution time"
                    placeholderTextColor="grey"
                  />
                  {field.state.meta.errors.length ? (
                    <ErrorText
                      text={field.state.meta.errors
                        .map((error) => error?.message)
                        .join(',')}
                    />
                  ) : null}
                </>
              )
            }}
          />
        </View>
      </View>

      {exercise.hasRepetitions && (
        <View>
          <Label text="Repetitions" />
          <form.Field
            name="repetitions"
            validators={{
              onBlur: z.string().refine((value) => /\d+/.test(value), {
                message: 'Must be a number',
              }),
            }}
            children={(field) => {
              return (
                <>
                  <Input
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Repetitions"
                    keyboardType="numeric"
                    placeholderTextColor="grey"
                  />
                  {field.state.meta.errors.length ? (
                    <ErrorText
                      text={field.state.meta.errors
                        .map((error) => error?.message)
                        .join(',')}
                    />
                  ) : null}
                </>
              )
            }}
          />
        </View>
      )}

      {exercise.hasWeight && (
        <View>
          <Label text="Weight" />
          <form.Field
            name="weight"
            validators={{
              onBlur: z.string().refine((value) => /\d+/.test(value), {
                message: 'Must be a number',
              }),
            }}
            children={(field) => {
              return (
                <>
                  <Input
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Weight"
                    keyboardType="numeric"
                    placeholderTextColor="grey"
                  />
                  {field.state.meta.errors.length ? (
                    <ErrorText
                      text={field.state.meta.errors
                        .map((error) => error?.message)
                        .join(',')}
                    />
                  ) : null}
                </>
              )
            }}
          />
        </View>
      )}

      {exercise.hasDistance && (
        <View>
          <Label text="Distance" />
          <form.Field
            name="distance"
            validators={{
              onBlur: z.string().refine((value) => /\d+/.test(value), {
                message: 'Must be a number',
              }),
            }}
            children={(field) => {
              return (
                <>
                  <Input
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Distance"
                    keyboardType="numeric"
                    placeholderTextColor="grey"
                  />
                  {field.state.meta.errors.length ? (
                    <ErrorText
                      text={field.state.meta.errors
                        .map((error) => error?.message)
                        .join(',')}
                    />
                  ) : null}
                </>
              )
            }}
          />
        </View>
      )}

      {exercise.hasTime && (
        <View>
          <Label text="Time" />
          <form.Field
            name="time"
            validators={{
              onBlur: z
                .string()
                .refine((value) => /^\d{2}:\d{2}:\d{2}$/.test(value), {
                  message: 'Must be a valid time in the format HH:MM:SS',
                }),
            }}
            children={(field) => {
              return (
                <>
                  <Input
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Time"
                    placeholderTextColor="grey"
                  />
                  {field.state.meta.errors.length ? (
                    <ErrorText
                      text={field.state.meta.errors
                        .map((error) => error?.message)
                        .join(',')}
                    />
                  ) : null}
                </>
              )
            }}
          />
        </View>
      )}

      <View>
        <Label text="Notes" />
        <form.Field
          name="notes"
          validators={{
            onBlur: z.string(),
          }}
          children={(field) => {
            return (
              <>
                <Textarea
                  onChangeText={field.handleChange}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  placeholder="Notes"
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
              </>
            )
          }}
        />
      </View>

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
