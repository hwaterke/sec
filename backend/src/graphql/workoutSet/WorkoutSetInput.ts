import {Field, InputType} from 'type-graphql'

@InputType()
export class WorkoutSetInput {
  @Field()
  exerciseUuid: string

  @Field()
  executedAt: Date

  @Field({nullable: true})
  repetitions?: number

  @Field({nullable: true})
  weight?: number

  @Field({nullable: true})
  time?: string

  @Field({nullable: true})
  distance?: number

  @Field({nullable: true})
  notes?: string
}

@InputType()
export class WorkoutSetUpdateInput {
  @Field()
  executedAt: Date

  @Field({nullable: true})
  repetitions?: number

  @Field({nullable: true})
  weight?: number

  @Field({nullable: true})
  time?: string

  @Field({nullable: true})
  distance?: number

  @Field({nullable: true})
  notes?: string
}
