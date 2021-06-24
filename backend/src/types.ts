import {Field, ID, ObjectType} from '@nestjs/graphql'

@ObjectType()
export class DeletedOutput {
  @Field(() => [ID])
  affected_uuids!: string[]
}
