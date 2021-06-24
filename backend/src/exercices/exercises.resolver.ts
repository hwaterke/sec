import {UseGuards} from '@nestjs/common'
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import {getRepository} from 'typeorm'
import {CurrentUser} from '../auth/current-user.decorator'
import {GqlAuthGuard} from '../auth/gql-auth-guard'
import {DeletedOutput} from '../types'
import {User} from '../users/entities/user.entity'
import {WorkoutSet} from '../workout_sets/workout_set.entity'
import {Exercise} from './exercise.entity'
import {ExerciseInput} from './exercise.input'
import {ExercisesService} from './exercises.service'

@Resolver(() => Exercise)
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExercisesService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Exercise])
  exercises(@CurrentUser() user: User): Promise<Exercise[]> {
    return this.exercisesService.getAllForUser({userUuid: user.uuid})
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Exercise)
  exercise(
    @Args('uuid', {type: () => ID}) uuid: string,
    @CurrentUser() user: User
  ): Promise<Exercise> {
    return this.exercisesService.getOneForUser({uuid, userUuid: user.uuid})
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Exercise)
  createExercise(
    @Args('payload') exerciseInput: ExerciseInput,
    @CurrentUser() user: User
  ): Promise<Exercise> {
    return this.exercisesService.create({
      ...exerciseInput,
      user: {uuid: user.uuid},
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Exercise)
  updateExercise(
    @Args('uuid', {type: () => ID}) uuid: string,
    @Args('payload') payload: ExerciseInput
  ): Promise<Exercise> {
    return this.exercisesService.update({
      uuid,
      payload,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeletedOutput)
  async deleteExercise(
    @Args('uuid', {type: () => ID}) uuid: string
  ): Promise<DeletedOutput> {
    await this.exercisesService.remove({uuid})
    return {affected_uuids: [uuid]}
  }

  @ResolveField(() => [WorkoutSet])
  lastWorkoutSets(@Parent() exercise: Exercise): Promise<WorkoutSet[]> {
    return getRepository(WorkoutSet).find({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
      where: {
        exercise: {
          uuid: exercise.uuid,
        },
      },
    })
  }
}
