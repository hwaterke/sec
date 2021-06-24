import {UseGuards} from '@nestjs/common'
import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql'
import {CurrentUser} from '../auth/current-user.decorator'
import {GqlAuthGuard} from '../auth/gql-auth-guard'
import {DeletedOutput} from '../types'
import {User} from '../users/entities/user.entity'
import {WorkoutDayObjectType} from './workout_day.type'
import {WorkoutSet} from './workout_set.entity'
import {WorkoutSetInput, WorkoutSetUpdateInput} from './workout_set.input'
import {WorkoutSetsService} from './workout_sets.service'

@Resolver()
export class WorkoutSetsResolver {
  constructor(private readonly workoutSetsService: WorkoutSetsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WorkoutSet)
  createWorkoutSet(
    @Args('payload') workoutSetInput: WorkoutSetInput,
    @CurrentUser() user: User
  ): Promise<WorkoutSet> {
    return this.workoutSetsService.create({
      ...workoutSetInput,
      exercise: {
        uuid: workoutSetInput.exerciseUuid,
      },
      user,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WorkoutSet)
  async updateWorkoutSet(
    @Args('uuid', {type: () => ID}) uuid: string,
    @Args('payload') workoutSetInput: WorkoutSetUpdateInput,
    @CurrentUser() user: User
  ) {
    return this.workoutSetsService.update({
      uuid,
      payload: workoutSetInput,
      userUuid: user.uuid,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => WorkoutSet)
  async workoutSet(
    @Args('uuid', {type: () => ID}) uuid: string,
    @CurrentUser() user: User
  ): Promise<WorkoutSet | undefined> {
    return this.workoutSetsService.getOne({
      uuid,
      userUuid: user.uuid,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [WorkoutDayObjectType])
  async workoutDays(
    @CurrentUser() user: User
  ): Promise<WorkoutDayObjectType[]> {
    return this.workoutSetsService.getDays({
      userUuid: user.uuid,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [WorkoutSet])
  async workoutSetForDay(
    @Args('date') date: string,
    @CurrentUser() user: User
  ): Promise<WorkoutSet[]> {
    return this.workoutSetsService.workoutSetForDay({
      date,
      userUuid: user.uuid,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeletedOutput)
  async deleteWorkoutSet(
    @Args('uuid', {type: () => ID}) uuid: string
  ): Promise<DeletedOutput> {
    await this.workoutSetsService.remove({uuid})
    return {affected_uuids: [uuid]}
  }
}
