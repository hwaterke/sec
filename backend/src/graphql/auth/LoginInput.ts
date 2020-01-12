import {ArgsType, Field} from 'type-graphql'
import {IsEmail} from 'class-validator'

@ArgsType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string
}
