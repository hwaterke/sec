import {desc, eq, sql} from 'drizzle-orm'
import {db} from '../database/datasource'
import {
  exercisesTable,
  InsertWorkoutSet,
  WorkoutSet,
  workoutSetsTable,
  WorkoutSetWithExercise,
} from '../database/schema'
import {nilAndEmptyToNull} from '../database/utils'
import {isNullish} from 'remeda'

export const WorkoutSetService = {
  getOne: async (id: string): Promise<WorkoutSetWithExercise> => {
    const results = await db
      .select()
      .from(workoutSetsTable)
      .innerJoin(
        exercisesTable,
        eq(exercisesTable.id, workoutSetsTable.exerciseId)
      )
      .where(eq(workoutSetsTable.id, id))
      .limit(1)

    const workoutSetData = results[0]

    if (isNullish(workoutSetData)) {
      throw new Error('Workout set not found')
    }

    return {
      ...workoutSetData.workout_set,
      exercise: workoutSetData.exercise,
    }
  },

  getLastWorkoutSetsForExercise: async (
    exerciseId: string
  ): Promise<WorkoutSet[]> => {
    const workoutSets = await db
      .select()
      .from(workoutSetsTable)
      .where(eq(workoutSetsTable.exerciseId, exerciseId))
      .orderBy(desc(workoutSetsTable.executedAt))
      .limit(10)

    return workoutSets
  },

  create: async (data: InsertWorkoutSet) => {
    return db.insert(workoutSetsTable).values({
      executedAt: data.executedAt,
      exerciseId: data.exerciseId,
      repetitions: data.repetitions,
      weight: data.weight,
      distance: data.distance,
      time: nilAndEmptyToNull(data.time),
      notes: nilAndEmptyToNull(data.notes),
    })
  },

  update: async ({id, data}: {id: string; data: InsertWorkoutSet}) => {
    return db
      .update(workoutSetsTable)
      .set({
        ...data,
        time: nilAndEmptyToNull(data.time),
        notes: nilAndEmptyToNull(data.notes),
      })
      .where(eq(workoutSetsTable.id, id))
  },

  remove: async ({id}: {id: string}) => {
    return db.delete(workoutSetsTable).where(eq(workoutSetsTable.id, id))
  },

  workoutDays: async (): Promise<{date: string; count: number}[]> => {
    return db
      .select({
        date: sql<string>`date(${workoutSetsTable.executedAt}, 'unixepoch', 'localtime')`,
        count: sql<number>`count(${workoutSetsTable.id})`,
      })
      .from(workoutSetsTable)
      .groupBy(
        sql`date(${workoutSetsTable.executedAt}, 'unixepoch', 'localtime')`
      )
  },

  workoutSetsForDay: async ({
    date,
  }: {
    date: string
  }): Promise<WorkoutSetWithExercise[]> => {
    const results = await db
      .select()
      .from(workoutSetsTable)
      .innerJoin(
        exercisesTable,
        eq(exercisesTable.id, workoutSetsTable.exerciseId)
      )
      .where(
        sql`date(${workoutSetsTable.executedAt}, 'unixepoch', 'localtime') = ${date}`
      )
      .orderBy(workoutSetsTable.executedAt)

    return results.map((result) => ({
      ...result.workout_set,
      exercise: result.exercise,
    }))
  },
}
