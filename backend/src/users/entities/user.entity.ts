import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Exercise} from '../../exercices/exercise.entity'
import {WorkoutSet} from '../../workout_sets/workout_set.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column({unique: true})
  email!: string

  @Column()
  password!: string

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises!: Exercise[]

  @OneToMany(() => WorkoutSet, (workoutSet) => workoutSet.user)
  workoutSets!: WorkoutSet[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
