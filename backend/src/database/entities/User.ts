import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Field, ID, ObjectType} from 'type-graphql'
import {Exercise} from './Exercise'
import {WorkoutSet} from './WorkoutSet'

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Field()
  @Column({unique: true})
  email: string

  @Column({select: false})
  password: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @OneToMany(
    () => Exercise,
    exercise => exercise.user
  )
  exercises: Exercise[]

  @OneToMany(
    () => WorkoutSet,
    workoutSet => workoutSet.user
  )
  workoutSets: WorkoutSet[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
