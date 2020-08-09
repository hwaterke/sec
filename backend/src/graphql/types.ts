import {User} from '../database/entities/User'
import {Field, ID, ObjectType} from 'type-graphql'

export type Context = {
  user?: User
}

@ObjectType()
export class DeletedOutput {
  @Field(() => [ID])
  affected_uuids: string[]
}
