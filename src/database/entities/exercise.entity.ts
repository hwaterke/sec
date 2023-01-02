import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import type {WorkoutSet} from './workout_set.entity'

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column('varchar', {unique: true})
  name!: string

  @Column('text', {nullable: true})
  description?: string

  @OneToMany('WorkoutSet', 'exercise')
  workoutSets!: WorkoutSet[]

  @Column('boolean', {name: 'has_repetitions', default: false})
  hasRepetitions!: boolean

  @Column('boolean', {name: 'has_weight', default: false})
  hasWeight!: boolean

  @Column('boolean', {name: 'has_time', default: false})
  hasTime!: boolean

  @Column('boolean', {name: 'has_distance', default: false})
  hasDistance!: boolean

  @Column('varchar')
  muscle!: string

  @Column('boolean', {name: 'is_cardio', default: false})
  isCardio!: boolean

  @Column('boolean', {name: 'is_machine', default: false})
  isMachine!: boolean

  @Column('boolean', {name: 'is_dumbbell', default: false})
  isDumbbell!: boolean

  @Column('boolean', {name: 'is_barbell', default: false})
  isBarbell!: boolean

  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt!: Date
}
