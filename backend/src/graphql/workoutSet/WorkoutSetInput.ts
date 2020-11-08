import {Field, InputType} from 'type-graphql'

@InputType()
export class WorkoutSetInput {
  @Field()
  exerciseUuid: string

  @Field({nullable: true})
  repetitions?: number

  @Field()
  executedAt: Date
}
