import {Field, InputType} from 'type-graphql'

@InputType()
export class ExerciseInput {
  @Field()
  name: string

  @Field({nullable: true})
  description?: string

  @Field()
  muscle: string
}
