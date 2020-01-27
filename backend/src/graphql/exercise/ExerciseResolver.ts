import {Arg, Authorized, Ctx, Mutation, Query, Resolver} from 'type-graphql'
import {ExerciseInput} from './ExerciseInput'
import {ExerciseService} from '../../services/ExerciseService'
import {Exercise} from '../../database/entities/Exercise'
import {Context} from '../types'

@Resolver()
export class ExerciseResolver {
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
  @Query(() => [Exercise])
  exercises(@Ctx() context: Context): Promise<Exercise[]> {
    return ExerciseService.getAllForUser({userUuid: context.user!.uuid})
  }
}
