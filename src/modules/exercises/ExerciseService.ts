import {useFocusEffect} from '@react-navigation/native'
import {useCallback, useEffect, useState} from 'react'
import {knex} from '../../database/datasource'
import {DatabaseExercise, Exercise} from '../../database/entities'
import {randomUUID} from 'expo-crypto'
import {nilAndEmptyToNull} from '../../database/utils'

type ExercisePayload = {
  name: string
  description: string | null
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

// convert database types
const convertExercise = (exercise: DatabaseExercise): Exercise => {
  return {
    uuid: exercise.uuid,
    name: exercise.name,
    description: exercise.description,
    muscle: exercise.muscle,
    hasRepetitions: exercise.has_repetitions === 1,
    hasWeight: exercise.has_weight === 1,
    hasTime: exercise.has_time === 1,
    hasDistance: exercise.has_distance === 1,
    isCardio: exercise.is_cardio === 1,
    isMachine: exercise.is_machine === 1,
    isDumbbell: exercise.is_dumbbell === 1,
    isBarbell: exercise.is_barbell === 1,
    createdAt: exercise.created_at,
    updatedAt: exercise.updated_at,
  }
}

const convertPayloadToDatabase = (payload: ExercisePayload) => {
  return {
    name: payload.name,
    description: nilAndEmptyToNull(payload.description),
    has_repetitions: payload.hasRepetitions ? 1 : 0,
    has_weight: payload.hasWeight ? 1 : 0,
    has_time: payload.hasTime ? 1 : 0,
    has_distance: payload.hasDistance ? 1 : 0,
    muscle: payload.muscle,
    is_cardio: payload.isCardio ? 1 : 0,
    is_machine: payload.isMachine ? 1 : 0,
    is_dumbbell: payload.isDumbbell ? 1 : 0,
    is_barbell: payload.isBarbell ? 1 : 0,
  }
}

export const ExerciseService = {
  getAll: async (): Promise<Exercise[]> => {
    const exercises = await knex<DatabaseExercise>('exercise')
    return exercises.map(convertExercise)
  },

  getOne: async (uuid: string): Promise<Exercise | null> => {
    const exercise = await knex<DatabaseExercise>('exercise')
      .where('uuid', uuid)
      .first()
    return exercise === undefined ? null : convertExercise(exercise)
  },

  create: (data: ExercisePayload) => {
    return knex<DatabaseExercise>('exercise').insert({
      uuid: randomUUID(),
      ...convertPayloadToDatabase(data),
    })
  },

  update: ({uuid, data}: {uuid: string; data: ExercisePayload}) => {
    return knex<DatabaseExercise>('exercise')
      .where('uuid', uuid)
      .update(convertPayloadToDatabase(data))
      .update('updated_at', knex.fn.now())
  },

  remove: ({uuid}: {uuid: string}) => {
    return knex<DatabaseExercise>('exercise').where('uuid', uuid).del()
  },
}

export const useExercise = ({
  uuid,
  refreshOnFocus,
}: {
  uuid: string
  refreshOnFocus: boolean
}) => {
  const [exercise, setExercise] = useState<Exercise | null>(null)

  useEffect(() => {
    if (!refreshOnFocus) {
      const main = async () => {
        const data = await ExerciseService.getOne(uuid)
        setExercise(data)
      }
      main()
    }
  }, [refreshOnFocus])

  useFocusEffect(
    useCallback(() => {
      if (refreshOnFocus) {
        const main = async () => {
          const data = await ExerciseService.getOne(uuid)
          setExercise(data)
        }
        main()
      }
    }, [refreshOnFocus])
  )

  return [exercise]
}
