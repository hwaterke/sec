import {useForm} from '@tanstack/react-form'
import React from 'react'
import {z} from 'zod'
import {Button} from '../../components/Button'
import {ErrorText, Label} from '../../components/Text'
import {TextInput} from '../../components/TextInput'
import {View} from 'react-native'

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
      <View>
        <Label>Execution date</Label>
        <form.Field
          name="executionDate"
          validators={{
            onBlur: z
              .string()
              .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
                message: 'Must be a valid date in the format YYYY-MM-DD',
              }),
          }}
          children={(field) => {
            return (
              <>
                <TextInput
                  onChangeText={field.handleChange}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  placeholder="Execution date"
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
      </View>

      <View>
        <Label>Execution time</Label>
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
                <TextInput
                  onChangeText={field.handleChange}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  placeholder="Execution time"
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
      </View>

      {exercise.hasRepetitions && (
        <View>
          <Label>Repetitions</Label>
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
                  <TextInput
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Repetitions"
                    keyboardType="numeric"
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
        </View>
      )}

      {exercise.hasWeight && (
        <View>
          <Label>Weight</Label>
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
                  <TextInput
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Weight"
                    keyboardType="numeric"
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
        </View>
      )}

      {exercise.hasDistance && (
        <View>
          <Label>Distance</Label>
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
                  <TextInput
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Distance"
                    keyboardType="numeric"
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
        </View>
      )}

      {exercise.hasTime && (
        <View>
          <Label>Time</Label>
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
                  <TextInput
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    placeholder="Time"
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
        </View>
      )}

      <View>
        <Label>Notes</Label>
        <form.Field
          name="notes"
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
                  placeholder="Notes"
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
