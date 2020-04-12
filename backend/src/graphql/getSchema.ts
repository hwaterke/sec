import {buildSchema} from 'type-graphql'
import {HealthResolver} from './health/HealthResolver'
import {RegisterResolver} from './auth/RegisterResolver'
import {LoginResolver} from './auth/LoginResolver'
import {MeResolver} from './auth/MeResolver'
import {ExerciseResolver} from './exercise/ExerciseResolver'
import {Context} from './types'
import {GraphQLSchema} from 'graphql'

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
