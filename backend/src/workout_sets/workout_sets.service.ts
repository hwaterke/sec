import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {WorkoutDayObjectType} from './workout_day.type'
import {WorkoutSet} from './workout_set.entity'
import {WorkoutSetUpdateInput} from './workout_set.input'

type WorkoutSetCreationData = {
  repetitions?: number
  user: {
    uuid: string
  }
  exercise: {
    uuid: string
  }
}

@Injectable()
export class WorkoutSetsService {
  constructor(
    @InjectRepository(WorkoutSet)
    private workoutSetRepository: Repository<WorkoutSet>
  ) {}

  getOne({
    uuid,
    userUuid,
  }: {
    uuid: string
    userUuid: string
  }): Promise<WorkoutSet | null> {
    return this.workoutSetRepository
      .createQueryBuilder('workoutSet')
      .leftJoinAndSelect('workoutSet.exercise', 'exercise')
      .where('workoutSet.uuid = :uuid', {uuid})
      .andWhere('workoutSet.user = :user', {user: userUuid})
      .getOne()
  }

  getAllForExercise({
    exerciseUuid,
  }: {
    exerciseUuid: string
  }): Promise<WorkoutSet[]> {
    return this.workoutSetRepository.find({
      where: {exercise: {uuid: exerciseUuid}},
    })
  }

  async getDays({
    userUuid,
  }: {
    userUuid: string
  }): Promise<WorkoutDayObjectType[]> {
    return this.workoutSetRepository
      .createQueryBuilder('workoutSet')
      .select('date(workoutSet.executedAt)', 'date')
      .addSelect('COUNT(workoutSet.uuid)', 'count')
      .groupBy('date(workoutSet.executedAt)')
      .orderBy('workoutSet.executedAt', 'DESC')
      .where('workoutSet.user = :user', {user: userUuid})
      .getRawMany()
  }

  workoutSetForDay({
    date,
    userUuid,
  }: {
    date: string
    userUuid: string
  }): Promise<WorkoutSet[]> {
    return this.workoutSetRepository
      .createQueryBuilder('workoutSet')
      .leftJoinAndSelect('workoutSet.exercise', 'exercise')
      .where('workoutSet.user = :user', {user: userUuid})
      .andWhere('date(workoutSet.executedAt) = date(:date)', {date})
      .orderBy('workoutSet.executedAt', 'ASC')
      .getMany()
  }

  create(workoutSetData: WorkoutSetCreationData): Promise<WorkoutSet> {
    const workoutSet = this.workoutSetRepository.create(workoutSetData)
    return this.workoutSetRepository.save(workoutSet)
  }

  async update({
    uuid,
    userUuid,
    payload,
  }: {
    uuid: string
    userUuid: string
    payload: WorkoutSetUpdateInput
  }): Promise<WorkoutSet | null> {
    await this.workoutSetRepository.update(
      {uuid, user: {uuid: userUuid}},
      payload
    )
    return this.getOne({uuid, userUuid})
  }

  remove({uuid}: {uuid: string}) {
    return this.workoutSetRepository.delete(uuid)
  }
}
