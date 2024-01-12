import {knex} from '../../database/datasource'
import {
  DatabaseWorkoutSet,
  WorkoutSet,
  WorkoutSetWithExercise,
} from '../../database/entities'
import {randomUUID} from 'expo-crypto'
import {nilAndEmptyToNull} from '../../database/utils'

type WorkoutSetPayload = {
  exerciseUuid: string
  repetitions: number | null
  weight: number | null
  distance: number | null
  time: string | null
  executedAt: string
  notes: string | null
}

// convert database types
const convertWorkoutSet = (workoutSet: DatabaseWorkoutSet): WorkoutSet => {
  return {
    ...workoutSet,
    executedAt: workoutSet.executed_at,
    exerciseUuid: workoutSet.exercise_uuid,
    createdAt: workoutSet.created_at,
    updatedAt: workoutSet.updated_at,
  }
}

const convertPayloadToDatabase = (payload: WorkoutSetPayload) => {
  return {
    exercise_uuid: payload.exerciseUuid,
    executed_at: payload.executedAt,
    repetitions: payload.repetitions,
    weight: payload.weight,
    distance: payload.distance,
    time: nilAndEmptyToNull(payload.time),
    notes: nilAndEmptyToNull(payload.notes),
  }
}

export const WorkoutSetService = {
  getOne: async (uuid: string): Promise<WorkoutSetWithExercise> => {
    const workoutSet = await knex<DatabaseWorkoutSet>('workout_set')
      .select(
        'workout_set.*',
        'exercise.name as exercise_name',
        'exercise.has_repetitions as exercise_has_repetitions',
        'exercise.has_weight as exercise_has_weight',
        'exercise.has_time as exercise_has_time',
        'exercise.has_distance as exercise_has_distance'
      )
      .join('exercise', 'exercise.uuid', 'workout_set.exercise_uuid')
      .where('workout_set.uuid', uuid)
      .first()
    return {
      ...convertWorkoutSet(workoutSet),
      exercise: {
        name: workoutSet.exercise_name,
        hasRepetitions: workoutSet.exercise_has_repetitions === 1,
        hasWeight: workoutSet.exercise_has_weight === 1,
        hasTime: workoutSet.exercise_has_time === 1,
        hasDistance: workoutSet.exercise_has_distance === 1,
      },
    }
  },

  getLastWorkoutSetsForExercise: async (
    exerciseUuid: string
  ): Promise<WorkoutSet[]> => {
    const workoutSets = await knex<DatabaseWorkoutSet>('workout_set')
      .where('exercise_uuid', exerciseUuid)
      .orderBy('created_at', 'desc')
      .limit(10)
    return workoutSets.map(convertWorkoutSet)
  },

  create: (data: WorkoutSetPayload) => {
    return knex<WorkoutSet>('workout_set').insert({
      uuid: randomUUID(),
      ...convertPayloadToDatabase(data),
    })
  },

  update: ({uuid, data}: {uuid: string; data: WorkoutSetPayload}) => {
    return knex<WorkoutSet>('workout_set')
      .where('uuid', uuid)
      .update(convertPayloadToDatabase(data))
      .update('updated_at', knex.fn.now())
  },

  remove: ({uuid}: {uuid: string}) => {
    return knex<WorkoutSet>('workout_set').where('uuid', uuid).del()
  },

  workoutDays: (): Promise<{date: string; count: number}[]> => {
    return knex<DatabaseWorkoutSet>('workout_set')
      .select(knex.raw('date(executed_at) as date, count(uuid) as count'))
      .groupByRaw('date(executed_at)')
  },

  workoutSetsForDay: async ({
    date,
  }: {
    date: string
  }): Promise<WorkoutSetWithExercise[]> => {
    const workoutSets = await knex<DatabaseWorkoutSet>('workout_set')
      .select(
        'workout_set.*',
        'exercise.name as exercise_name',
        'exercise.has_repetitions as exercise_has_repetitions',
        'exercise.has_weight as exercise_has_weight',
        'exercise.has_time as exercise_has_time',
        'exercise.has_distance as exercise_has_distance'
      )
      .join('exercise', 'exercise.uuid', 'workout_set.exercise_uuid')
      .whereRaw('date(executed_at) = ?', [date])
      .orderBy('executed_at', 'ASC')

    return workoutSets.map((ws) => ({
      ...convertWorkoutSet(ws),
      exercise: {
        name: ws.exercise_name,
        hasRepetitions: ws.exercise_has_repetitions === 1,
        hasWeight: ws.exercise_has_weight === 1,
        hasTime: ws.exercise_has_time === 1,
        hasDistance: ws.exercise_has_distance === 1,
      },
    }))
  },
}
