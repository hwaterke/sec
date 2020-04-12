import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Field, ID, ObjectType} from 'type-graphql'
import {User} from './User'
import {WorkoutSet} from './WorkoutSet'

@Entity()
@ObjectType()
export class Exercise {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Field()
  @Column({unique: true})
  name: string

  @Field()
  @Column({type: 'text', nullable: true})
  description?: string

  @ManyToOne(() => User, (user) => user.exercises)
  user: User

  @OneToMany(() => WorkoutSet, (workoutSet) => workoutSet.exercise)
  workoutSets: WorkoutSet[]

  @Field()
  @Column({default: false})
  hasRepetitions: boolean

  @Field()
  @Column({default: false})
  hasWeight: boolean

  @Field()
  @Column({default: false})
  hasTime: boolean

  @Field()
  @Column({default: false})
  hasDistance: boolean

  @Field()
  @Column()
  muscle: string

  @Field()
  @Column({default: false})
  isCardio: boolean

  @Field()
  @Column({default: false})
  isMachine: boolean

  @Field()
  @Column({default: false})
  isDumbbell: boolean

  @Field()
  @Column({default: false})
  isBarbell: boolean

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
