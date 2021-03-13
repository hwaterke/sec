import {getRepository} from 'typeorm'
import {WorkoutSetInput} from '../graphql/workoutSet/WorkoutSetInput'
import {WorkoutSet} from '../database/entities/WorkoutSet'
import {WorkoutDayObjectType} from '../graphql/workoutSet/WorkoutDayObjectType'

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

  remove: ({uuid}: {uuid: string}) => {
    return getRepository(WorkoutSet).delete(uuid)
  },
}
