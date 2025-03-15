import {sql} from 'drizzle-orm'
import {check, integer, real, sqliteTable, text} from 'drizzle-orm/sqlite-core'
import {createId} from '@paralleldrive/cuid2'

export const exercisesTable = sqliteTable('exercise', {
  id: text('id', {
    length: 24,
  })
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  name: text('name').notNull().unique(),
  description: text('description'),
  hasRepetitions: integer('has_repetitions', {mode: 'boolean'})
    .notNull()
    .default(false),
  hasWeight: integer('has_weight', {mode: 'boolean'}).notNull().default(false),
  hasTime: integer('has_time', {mode: 'boolean'}).notNull().default(false),
  hasDistance: integer('has_distance', {mode: 'boolean'})
    .notNull()
    .default(false),
  muscle: text('muscle'),
  isCardio: integer('is_cardio', {mode: 'boolean'}).notNull().default(false),
  isMachine: integer('is_machine', {mode: 'boolean'}).notNull().default(false),
  isDumbbell: integer('is_dumbbell', {mode: 'boolean'})
    .notNull()
    .default(false),
  isBarbell: integer('is_barbell', {mode: 'boolean'}).notNull().default(false),
  // Epoch timestamp (UTC)
  createdAt: integer('created_at')
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  // Epoch timestamp (UTC)
  updatedAt: integer('updated_at')
    .notNull()
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => sql`(strftime('%s', 'now'))`),
})

export const workoutSetsTable = sqliteTable(
  'workout_set',
  {
    id: text('id', {
      length: 24,
    })
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    repetitions: integer('repetitions'),
    weight: real('weight'),
    time: text('time'),
    distance: real('distance'),
    notes: text('notes'),
    // Epoch timestamp (UTC)
    executedAt: integer('executed_at').notNull(),
    exerciseId: text('exercise_id', {
      length: 24,
    })
      .notNull()
      .references(() => exercisesTable.id),
    // Epoch timestamp (UTC)
    createdAt: integer('created_at')
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    // Epoch timestamp (UTC)
    updatedAt: integer('updated_at')
      .notNull()
      .default(sql`(strftime('%s', 'now'))`)
      .$onUpdate(() => sql`(strftime('%s', 'now'))`),
  },
  (table) => [
    check('positive_repetitions', sql`${table.repetitions} > 0`),
    check('positive_distance', sql`${table.distance} >= 0`),
    check('positive_weight', sql`${table.weight} >= 0`),
    check('time_format', sql`${table.time} IS strftime('%H:%M:%S', time)`),
  ]
)

export type Exercise = typeof exercisesTable.$inferSelect
export type InsertExercise = Omit<
  typeof exercisesTable.$inferInsert,
  'id' | 'createdAt' | 'updatedAt'
>

export type WorkoutSet = typeof workoutSetsTable.$inferSelect
export type WorkoutSetWithExercise = WorkoutSet & {
  exercise: Exercise
}
export type InsertWorkoutSet = Omit<
  typeof workoutSetsTable.$inferInsert,
  'id' | 'createdAt' | 'updatedAt'
>
