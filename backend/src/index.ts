import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {databaseConfig} from './database/config'
import {ApolloServer} from 'apollo-server'
import {JwtService} from './services/JwtService'
import {loadMockData} from './mocks'
import {NODE_ENV} from './constants/env'
import {getSchema} from './graphql/getSchema'

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
