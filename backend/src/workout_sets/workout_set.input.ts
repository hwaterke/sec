import {Field, InputType} from '@nestjs/graphql'
import {IsInt, IsOptional, IsPositive, Matches} from 'class-validator'

@InputType()
export class WorkoutSetInput {
  @Field()
  exerciseUuid!: string

  @Field()
  executedAt!: Date

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Field({nullable: true})
  repetitions?: number

  @Field({nullable: true})
  weight?: number

  @IsOptional()
  @Matches(/^\d\d:\d\d:\d\d$/)
  @Field({nullable: true})
  time?: string

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Field({nullable: true})
  distance?: number

  @Field({nullable: true})
  notes?: string
}

@InputType()
export class WorkoutSetUpdateInput {
  @Field()
  executedAt!: Date

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Field({nullable: true})
  repetitions?: number

  @Field({nullable: true})
  weight?: number

  @IsOptional()
  @Matches(/^\d\d:\d\d:\d\d$/)
  @Field({nullable: true})
  time?: string

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Field({nullable: true})
  distance?: number

  @Field({nullable: true})
  notes?: string
}
