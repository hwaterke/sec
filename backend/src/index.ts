import {ApolloServer} from 'apollo-server'
import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {NODE_ENV} from './constants/env'
import {databaseConfig} from './database/config'
import {getSchema} from './graphql/getSchema'
import {loadMockData} from './mocks'
import {JwtService} from './services/JwtService'

const main = async () => {
  await createConnection(databaseConfig)

  const server = new ApolloServer({
    schema: await getSchema(),
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
main().catch((error) => console.error(error))
