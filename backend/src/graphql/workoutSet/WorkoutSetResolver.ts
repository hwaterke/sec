import {Arg, Authorized, Ctx, Mutation, Query, Resolver} from 'type-graphql'
import {WorkoutSet} from '../../database/entities/WorkoutSet'
import {Context} from '../types'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {WorkoutSetInput} from './WorkoutSetInput'
import {WorkoutDayObjectType} from './WorkoutDayObjectType'

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

  @Authorized()
  @Query(() => [WorkoutDayObjectType])
  async workoutDays(@Ctx() context: Context): Promise<WorkoutDayObjectType[]> {
    return WorkoutSetService.getDays({
      userUuid: context.user!.uuid,
    })
  }

  @Authorized()
  @Query(() => [WorkoutSet])
  async workoutSetForDay(
    @Arg('date') date: string,
    @Ctx() context: Context
  ): Promise<WorkoutSet[]> {
    return WorkoutSetService.workoutSetForDay({
      date,
      userUuid: context.user!.uuid,
    })
  }
}
