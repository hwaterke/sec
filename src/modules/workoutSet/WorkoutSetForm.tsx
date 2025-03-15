import {useForm} from '@tanstack/react-form'
import React from 'react'
import {z} from 'zod'
import {Button} from '../../components/Button'
import {ErrorText} from '../../components/Text'
import {TextInput} from '../../components/TextInput'

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
    <>
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

      {exercise.hasRepetitions && (
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
      )}

      {exercise.hasWeight && (
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
      )}

      {exercise.hasDistance && (
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
      )}

      {exercise.hasTime && (
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
      )}

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
