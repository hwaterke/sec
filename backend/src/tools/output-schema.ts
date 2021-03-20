import path from 'path'
import 'reflect-metadata'
import {emitSchemaDefinitionFile} from 'type-graphql'
import {getSchema} from '../graphql/getSchema'

getSchema()
  .then((schema) =>
    emitSchemaDefinitionFile(
      path.resolve(__dirname, '..', '..', 'schema.graphql'),
      schema
    )
  )
  .then(() => process.exit(0))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err)
  })
