import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class ExerciseInput {
  @Field()
  name!: string

  @Field({nullable: true})
  description?: string

  @Field()
  hasRepetitions!: boolean

  @Field()
  hasWeight!: boolean

  @Field()
  hasTime!: boolean

  @Field()
  hasDistance!: boolean

  @Field()
  muscle!: string

  @Field()
  isCardio!: boolean

  @Field()
  isMachine!: boolean

  @Field()
  isDumbbell!: boolean

  @Field()
  isBarbell!: boolean
}
