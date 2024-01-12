import type {Knex} from 'knex'

interface Migration {
  name: string
  up(knex: Knex): Promise<void>
}

const initialMigration: Migration = {
  name: 'initial',
  async up(knex: Knex): Promise<void> {
    await knex.schema.createTable('exercise', (table) => {
      table.string('uuid').primary()
      table.string('name').unique().notNullable()
      table.text('description')
      table.boolean('has_repetitions').defaultTo(false).notNullable()
      table.boolean('has_weight').defaultTo(false).notNullable()
      table.boolean('has_time').defaultTo(false).notNullable()
      table.boolean('has_distance').defaultTo(false).notNullable()
      table.string('muscle').notNullable()
      table.boolean('is_cardio').defaultTo(false).notNullable()
      table.boolean('is_machine').defaultTo(false).notNullable()
      table.boolean('is_dumbbell').defaultTo(false).notNullable()
      table.boolean('is_barbell').defaultTo(false).notNullable()
      table.datetime('created_at').defaultTo(knex.fn.now())
      table.datetime('updated_at').defaultTo(knex.fn.now())
    })

    await knex.schema.createTable('workout_set', (table) => {
      table.string('uuid').primary()
      table.integer('repetitions')
      table.double('weight')
      table.string('time')
      table.double('distance')
      table.text('notes')
      table.datetime('executed_at').notNullable()
      table.string('exercise_uuid').notNullable()
      table.datetime('created_at').defaultTo(knex.fn.now())
      table.datetime('updated_at').defaultTo(knex.fn.now())
      table
        .foreign('exercise_uuid')
        .references('exercise.uuid')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
      table.check('?? >= 0', ['distance'])
      table.check('?? IS strftime("%H:%M:%S", ??)', ['time', 'time'])
      table.check('?? >= 0', ['weight'])
      table.check('?? > 0', ['repetitions'])
    })
  },
}

export const MIGRATIONS = [initialMigration]
