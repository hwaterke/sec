import {Field, ID, ObjectType} from 'type-graphql'
import {User} from '../database/entities/User'

export type Context = {
  user?: User
}

@ObjectType()
export class DeletedOutput {
  @Field(() => [ID])
  affected_uuids: string[]
}
