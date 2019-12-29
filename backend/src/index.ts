import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {databaseConfig} from './database/config'

const main = async () => {
  console.log('Creating database connection')
  await createConnection(databaseConfig)
  console.log('Database ready')
}

main().catch(error => console.error(error))
