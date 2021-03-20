import {getRepository} from 'typeorm'
import {WorkoutSet} from '../database/entities/WorkoutSet'
import {WorkoutDayObjectType} from '../graphql/workoutSet/WorkoutDayObjectType'
import {WorkoutSetUpdateInput} from '../graphql/workoutSet/WorkoutSetInput'

type WorkoutSetCreationData = {
  repetitions?: number
  user: {
    uuid: string
  }
  exercise: {
    uuid: string
  }
}

export const WorkoutSetService = {
  getOne: ({
    uuid,
    userUuid,
  }: {
    uuid: string
    userUuid: string
  }): Promise<WorkoutSet | undefined> => {
    const repository = getRepository(WorkoutSet)
    return repository
      .createQueryBuilder('workoutSet')
      .leftJoinAndSelect('workoutSet.exercise', 'exercise')
      .where('workoutSet.uuid = :uuid', {uuid})
      .andWhere('workoutSet.user = :user', {user: userUuid})
      .getOne()
  },

  getAllForExercise: ({
    exerciseUuid,
  }: {
    exerciseUuid: string
  }): Promise<WorkoutSet[]> => {
    const repository = getRepository(WorkoutSet)
    return repository.find({where: {exercise: {uuid: exerciseUuid}}})
  },

  getDays: async ({
    userUuid,
  }: {
    userUuid: string
  }): Promise<WorkoutDayObjectType[]> => {
    const repository = getRepository(WorkoutSet)

    return repository
      .createQueryBuilder('workoutSet')
      .select('date(workoutSet.executedAt)', 'date')
      .addSelect('COUNT(workoutSet.uuid)', 'count')
      .groupBy('date(workoutSet.executedAt)')
      .orderBy('workoutSet.executedAt', 'DESC')
      .where('workoutSet.user = :user', {user: userUuid})
      .getRawMany()
  },

  workoutSetForDay: ({
    date,
    userUuid,
  }: {
    date: string
    userUuid: string
  }): Promise<WorkoutSet[]> => {
    const repository = getRepository(WorkoutSet)

    return repository
      .createQueryBuilder('workoutSet')
      .leftJoinAndSelect('workoutSet.exercise', 'exercise')
      .where('workoutSet.user = :user', {user: userUuid})
      .andWhere('date(workoutSet.executedAt) = date(:date)', {date})
      .getMany()
  },

  create: (workoutSetData: WorkoutSetCreationData): Promise<WorkoutSet> => {
    const repository = getRepository(WorkoutSet)
    const workoutSet = repository.create(workoutSetData)
    return repository.save(workoutSet)
  },

  update: async ({
    uuid,
    userUuid,
    payload,
  }: {
    uuid: string
    userUuid: string
    payload: WorkoutSetUpdateInput
  }): Promise<WorkoutSet | undefined> => {
    const repository = getRepository(WorkoutSet)
    await repository.update({uuid, user: {uuid: userUuid}}, payload)
    return WorkoutSetService.getOne({uuid, userUuid})
  },

  remove: ({uuid}: {uuid: string}) => {
    return getRepository(WorkoutSet).delete(uuid)
  },
}
