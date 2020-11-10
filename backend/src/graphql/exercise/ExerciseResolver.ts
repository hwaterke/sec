import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import {ExerciseInput} from './ExerciseInput'
import {ExerciseService} from '../../services/ExerciseService'
import {Exercise} from '../../database/entities/Exercise'
import {Context, DeletedOutput} from '../types'
import {WorkoutSet} from '../../database/entities/WorkoutSet'
import {getRepository} from 'typeorm'

@Resolver(() => Exercise)
export class ExerciseResolver {
  @Authorized()
  @Query(() => [Exercise])
  exercises(@Ctx() context: Context): Promise<Exercise[]> {
    return ExerciseService.getAllForUser({userUuid: context.user!.uuid})
  }

  @Authorized()
  @Query(() => Exercise)
  exercise(
    @Arg('uuid', () => ID) uuid: string,
    @Ctx() context: Context
  ): Promise<Exercise> {
    return ExerciseService.getOneForUser({uuid, userUuid: context.user!.uuid})
  }

  @Authorized()
  @Mutation(() => Exercise)
  createExercise(
    @Arg('payload') exerciseInput: ExerciseInput,
    @Ctx() context: Context
  ): Promise<Exercise> {
    return ExerciseService.create({
      ...exerciseInput,
      user: {uuid: context.user!.uuid},
    })
  }

  @Authorized()
  @Mutation(() => Exercise)
  updateExercise(
    @Arg('uuid', () => ID) uuid: string,
    @Arg('payload') payload: ExerciseInput
  ): Promise<Exercise> {
    return ExerciseService.update({
      uuid,
      payload,
    })
  }

  @Authorized()
  @Mutation(() => DeletedOutput)
  async deleteExercise(
    @Arg('uuid', () => ID) uuid: string
  ): Promise<DeletedOutput> {
    await ExerciseService.remove({uuid})
    return {affected_uuids: [uuid]}
  }

  @FieldResolver(() => [WorkoutSet])
  lastWorkoutSets(@Root() exercise: Exercise): Promise<WorkoutSet[]> {
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
