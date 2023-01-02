import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/browser'
import {Exercise} from './exercise.entity'

@Entity('workout_set')
@Check('repetitions > 0')
@Check('weight >= 0')
@Check("time IS strftime('%H:%M:%S', time)")
@Check('distance >= 0')
export class WorkoutSet {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column('integer', {nullable: true})
  repetitions?: number

  // Weight in grams
  @Column('real', {nullable: true})
  weight?: number

  @Column('varchar', {nullable: true})
  time?: string

  // Distance in meters
  @Column('real', {nullable: true})
  distance?: number

  // Distance in meters
  @Column('text', {nullable: true})
  notes?: string

  @Column('datetime', {name: 'executed_at'})
  executedAt!: Date

  @ManyToOne(() => Exercise, {
    nullable: false,
  })
  @JoinColumn({name: 'exercise_uuid'})
  exercise!: Exercise

  @Column({name: 'exercise_uuid'})
  exerciseUuid!: string

  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt!: Date
}
