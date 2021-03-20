import {GraphQLSchema} from 'graphql'
import {buildSchema} from 'type-graphql'
import {LoginResolver} from './auth/LoginResolver'
import {MeResolver} from './auth/MeResolver'
import {RegisterResolver} from './auth/RegisterResolver'
import {ExerciseResolver} from './exercise/ExerciseResolver'
import {HealthResolver} from './health/HealthResolver'
import {Context} from './types'
import {WorkoutSetResolver} from './workoutSet/WorkoutSetResolver'

let schema: GraphQLSchema | null = null

export const getSchema = async (): Promise<GraphQLSchema> => {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [
        HealthResolver,
        RegisterResolver,
        LoginResolver,
        MeResolver,
        ExerciseResolver,
        WorkoutSetResolver,
      ],
      emitSchemaFile:
        process.env.NODE_ENV === 'production' ? './schema.graphql' : undefined,
      authChecker: ({context}: {context: Context}) => {
        return !!context.user
      },
    })
  }

  return schema
}
