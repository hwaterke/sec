import {ArgsType, Field} from '@nestjs/graphql'
import {IsEmail, Length} from 'class-validator'
import {User} from '../../users/entities/user.entity'

@ArgsType()
export class RegisterInput implements Partial<User> {
  @Field()
  @IsEmail()
  email!: string

  @Field()
  @Length(8, 250)
  password!: string

  @Field()
  @Length(1, 250)
  firstName!: string

  @Field()
  @Length(1, 250)
  lastName!: string
}
