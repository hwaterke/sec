import {getRepository} from 'typeorm'
import {Exercise} from '../database/entities/Exercise'
import {ExerciseInput} from '../graphql/exercise/ExerciseInput'

export const ExerciseService = {
  getAllForUser: ({userUuid}: {userUuid: string}) => {
    const repository = getRepository(Exercise)
    return repository.find({where: {user: {uuid: userUuid}}})
  },

  create: (
    exerciseInput: ExerciseInput & {user: {uuid: string}}
  ): Promise<Exercise> => {
    const repository = getRepository(Exercise)
    const exercise = repository.create(exerciseInput)
    return repository.save(exercise)
  },
}
