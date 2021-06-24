import {Field, ID, ObjectType} from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Exercise} from '../exercices/exercise.entity'
import {User} from '../users/entities/user.entity'

@Entity()
@ObjectType()
export class WorkoutSet {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Field({nullable: true})
  @Column({nullable: true})
  repetitions?: number

  // Weight in grams
  @Field({nullable: true})
  @Column({nullable: true})
  weight?: number

  @Field({nullable: true})
  @Column({nullable: true})
  time?: string

  // Distance in meters
  @Field({nullable: true})
  @Column({nullable: true})
  distance?: number

  // Distance in meters
  @Field({nullable: true})
  @Column({nullable: true})
  notes?: string

  @Field()
  @Column()
  executedAt!: Date

  @Field(() => Exercise)
  @ManyToOne(() => Exercise, (exercise) => exercise.workoutSets, {
    nullable: false,
  })
  exercise!: Exercise

  @ManyToOne(() => User, (user) => user.exercises, {
    nullable: false,
  })
  user!: User

  @Field()
  @CreateDateColumn()
  createdAt!: Date

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date
}
