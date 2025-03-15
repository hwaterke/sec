import {useForm} from '@tanstack/react-form'
import React from 'react'
import {Text} from 'react-native'
import {z} from 'zod'
import {Button} from '../../components/Button'
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

const schema = z.object({
  executionDate: z
    .string()
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Must be a valid date in the format YYYY-MM-DD',
    }),
  executionTime: z
    .string()
    .refine((value) => /^\d{2}:\d{2}:\d{2}$/.test(value), {
      message: 'Must be a valid time in the format HH:MM:SS',
    }),
  repetitions: z.string().refine((value) => value === '' || /\d+/.test(value), {
    message: 'Must be a number',
  }),
  weight: z.string().refine((value) => value === '' || /\d+/.test(value), {
    message: 'Must be a number',
  }),
  distance: z.string().refine((value) => value === '' || /\d+/.test(value), {
    message: 'Must be a number',
  }),
  time: z.string().refine((value) => value === '' || /\d+/.test(value), {
    message: 'Must be a number',
  }),
  notes: z.string(),
})

export const WorkoutSetForm = ({exercise, onSubmit, initialValues}: Props) => {
  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({value}) => {
      await onSubmit(value)
    },
    validators: {
      onBlur: schema,
    },
  })

  return (
    <>
      <form.Field
        name="executionDate"
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
                <Text>
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join(',')}
                </Text>
              ) : null}
            </>
          )
        }}
      />

      <form.Field
        name="executionTime"
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
                <Text>
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join(',')}
                </Text>
              ) : null}
            </>
          )
        }}
      />

      {exercise.hasRepetitions && (
        <form.Field
          name="repetitions"
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
                  <Text>
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(',')}
                  </Text>
                ) : null}
              </>
            )
          }}
        />
      )}

      {exercise.hasWeight && (
        <form.Field
          name="weight"
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
                  <Text>
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(',')}
                  </Text>
                ) : null}
              </>
            )
          }}
        />
      )}

      {exercise.hasDistance && (
        <form.Field
          name="distance"
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
                  <Text>
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(',')}
                  </Text>
                ) : null}
              </>
            )
          }}
        />
      )}

      {exercise.hasTime && (
        <form.Field
          name="time"
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
                  <Text>
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(',')}
                  </Text>
                ) : null}
              </>
            )
          }}
        />
      )}

      <form.Field
        name="notes"
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
                <Text>
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join(',')}
                </Text>
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
