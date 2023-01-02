import {DATASOURCE} from '../../database/datasource'
import {WorkoutSet} from '../../database/entities/workout_set.entity'

type WorkoutSetPayload = {
  exerciseUuid: string
  repetitions?: number
  weight?: number
  distance?: number
  time?: string
  executedAt: string
}

export const WorkoutSetService = {
  getOne: (uuid: string) => {
    const repo = DATASOURCE.getRepository(WorkoutSet)
    return repo.findOne({
      where: {
        uuid,
      },
      relations: {
        exercise: true,
      },
    })
  },

  create: (data: WorkoutSetPayload) => {
    const repo = DATASOURCE.getRepository(WorkoutSet)
    return repo.save(data)
  },

  update: ({uuid, data}: {uuid: string; data: WorkoutSetPayload}) => {
    const repo = DATASOURCE.getRepository(WorkoutSet)
    return repo.update(uuid, data)
  },

  remove: ({uuid}: {uuid: string}) => {
    const repo = DATASOURCE.getRepository(WorkoutSet)
    return repo.delete(uuid)
  },

  workoutDays: (): Promise<{date: string; count: number}[]> => {
    const repo = DATASOURCE.getRepository(WorkoutSet)

    return repo
      .createQueryBuilder('ws')
      .select('date(ws.executedAt)', 'date')
      .addSelect('COUNT(ws.uuid)', 'count')
      .groupBy('date(ws.executedAt)')
      .getRawMany()
  },

  workoutSetsForDay: ({date}: {date: string}) => {
    const repo = DATASOURCE.getRepository(WorkoutSet)
    return repo
      .createQueryBuilder('ws')
      .leftJoinAndSelect('ws.exercise', 'exercise')
      .where('date(ws.executedAt) = date(:date)', {date})
      .orderBy('ws.executedAt', 'ASC')
      .getMany()
  },
}
