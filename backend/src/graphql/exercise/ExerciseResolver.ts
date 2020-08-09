import {Arg, Authorized, Ctx, ID, Mutation, Query, Resolver} from 'type-graphql'
import {ExerciseInput} from './ExerciseInput'
import {ExerciseService} from '../../services/ExerciseService'
import {Exercise} from '../../database/entities/Exercise'
import {Context, DeletedOutput} from '../types'

@Resolver()
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
}
