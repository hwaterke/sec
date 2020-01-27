import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Field, ID, ObjectType} from 'type-graphql'
import {Exercise} from './Exercise'
import {User} from './User'

@Entity()
@ObjectType()
export class WorkoutSet {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Field()
  @Column({nullable: true})
  repetitions: number

  // Weight in grams
  @Field()
  @Column({nullable: true})
  weight: number

  @Field()
  @Column({nullable: true})
  time: string

  // Distance in meters
  @Field()
  @Column({nullable: true})
  distance: number

  // Distance in meters
  @Field()
  @Column({nullable: true})
  notes: string

  @Field()
  @Column()
  executedAt: Date

  @ManyToOne(
    () => Exercise,
    exercise => exercise.workoutSets
  )
  exercise: Exercise

  @ManyToOne(
    () => User,
    user => user.exercises
  )
  user: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}

/*
 foreign_key :exercise_uuid, :exercises, null: false, type: 'uuid'
 foreign_key :user_uuid, :users, null: false, type: 'uuid'
 */
