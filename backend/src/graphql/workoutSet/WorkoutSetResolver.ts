import {Arg, Authorized, Ctx, Mutation, Resolver} from 'type-graphql'
import {WorkoutSet} from '../../database/entities/WorkoutSet'
import {Context} from '../types'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {WorkoutSetInput} from './WorkoutSetInput'

@Resolver()
export class WorkoutSetResolver {
  @Authorized()
  @Mutation(() => WorkoutSet)
  async createWorkoutSet(
    @Arg('payload') workoutSetInput: WorkoutSetInput,
    @Ctx() context: Context
  ): Promise<WorkoutSet> {
    return WorkoutSetService.create({
      ...workoutSetInput,
      exercise: {
        uuid: workoutSetInput.exerciseUuid,
      },
      user: {uuid: context.user!.uuid},
    })
  }
}
