import {ArgsType, Field} from 'type-graphql'
import {IsEmail, Length} from 'class-validator'
import {User} from '../../database/entities/User'

@ArgsType()
export class RegisterInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @Length(8, 250)
  password: string

  @Field()
  @Length(1, 250)
  firstName: string

  @Field()
  @Length(1, 250)
  lastName: string
}
