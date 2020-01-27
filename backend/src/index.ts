import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {databaseConfig} from './database/config'
import {buildSchema} from 'type-graphql'
import {ApolloServer} from 'apollo-server'
import {RegisterResolver} from './graphql/auth/RegisterResolver'
import {LoginResolver} from './graphql/auth/LoginResolver'
import {HealthResolver} from './graphql/health/HealthResolver'
import {JwtService} from './services/JwtService'
import {Context} from './graphql/types'
import {MeResolver} from './graphql/auth/MeResolver'
import {ExerciseResolver} from './graphql/exercise/ExerciseResolver'
import {loadMockData} from './mocks'
import {NODE_ENV} from './constants/env'

const main = async () => {
  await createConnection(databaseConfig)

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [
      HealthResolver,
      RegisterResolver,
      LoginResolver,
      MeResolver,
      ExerciseResolver,
    ],
    emitSchemaFile: './schema.graphql',
    authChecker: ({context}: {context: Context}) => {
      return !!context.user
    },
  })

  const server = new ApolloServer({
    schema,
    context: async ({req}) => {
      try {
        const token = req.headers.authorization

        if (token) {
          const user = await JwtService.getUserFromToken(token)
          return {user}
        }
      } catch (e) {
        return {}
      }

      return {}
    },
  })

  const {url} = await server.listen()

  if (NODE_ENV === 'development') {
    await loadMockData()
  }

  // eslint-disable-next-line no-console
  console.log(`Server ready at ${url}`)
}

// eslint-disable-next-line no-console
main().catch(error => console.error(error))
