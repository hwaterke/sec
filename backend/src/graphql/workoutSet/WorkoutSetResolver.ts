import {Arg, Authorized, Ctx, ID, Mutation, Query, Resolver} from 'type-graphql'
import {WorkoutSet} from '../../database/entities/WorkoutSet'
import {WorkoutSetService} from '../../services/WorkoutSetService'
import {Context, DeletedOutput} from '../types'
import {WorkoutDayObjectType} from './WorkoutDayObjectType'
import {WorkoutSetInput, WorkoutSetUpdateInput} from './WorkoutSetInput'

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
  @Mutation(() => WorkoutSet)
  async updateWorkoutSet(
    @Arg('uuid', () => ID) uuid: string,
    @Arg('payload') workoutSetInput: WorkoutSetUpdateInput,
    @Ctx() context: Context
  ) {
    return WorkoutSetService.update({
      uuid,
      payload: workoutSetInput,
      userUuid: context.user!.uuid,
    })
  }

  @Authorized()
  @Query(() => WorkoutSet)
  async workoutSet(
    @Arg('uuid', () => ID) uuid: string,
    @Ctx() context: Context
  ): Promise<WorkoutSet | undefined> {
    return WorkoutSetService.getOne({
      uuid,
      userUuid: context.user!.uuid,
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

  @Authorized()
  @Mutation(() => DeletedOutput)
  async deleteWorkoutSet(
    @Arg('uuid', () => ID) uuid: string
  ): Promise<DeletedOutput> {
    await WorkoutSetService.remove({uuid})
    return {affected_uuids: [uuid]}
  }
}
