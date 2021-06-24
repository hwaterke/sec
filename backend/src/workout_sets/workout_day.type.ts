import {Field, Int, ObjectType} from '@nestjs/graphql'

@ObjectType()
export class WorkoutDayObjectType {
  @Field()
  date!: string

  @Field(() => Int)
  count!: number
}
