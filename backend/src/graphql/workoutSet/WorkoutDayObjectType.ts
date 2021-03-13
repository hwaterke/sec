import {Field, Int, ObjectType} from 'type-graphql'

@ObjectType()
export class WorkoutDayObjectType {
  @Field()
  date: string

  @Field(() => Int)
  count: number
}
