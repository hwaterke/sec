import {getRepository} from 'typeorm'
import {WorkoutSetInput} from '../graphql/workoutSet/WorkoutSetInput'
import {WorkoutSet} from '../database/entities/WorkoutSet'

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

  create: (workoutSetData: WorkoutSetCreationData): Promise<WorkoutSet> => {
    const repository = getRepository(WorkoutSet)
    const workoutSet = repository.create(workoutSetData)
    return repository.save(workoutSet)
  },

  remove: ({uuid}: {uuid: string}) => {
    return getRepository(WorkoutSet).delete(uuid)
  },
}
