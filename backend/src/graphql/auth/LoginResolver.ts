import {AuthenticationError} from 'apollo-server'
import {Args, Field, Mutation, ObjectType, Resolver} from 'type-graphql'
import {User} from '../../database/entities/User'
import {JwtService} from '../../services/JwtService'
import {UserService} from '../../services/UserService'
import {LoginInput} from './LoginInput'

@ObjectType()
class UserWithToken {
  @Field()
  user: User
  @Field()
  token: string
}

@Resolver()
export class LoginResolver {
  @Mutation(() => UserWithToken)
  async login(@Args() {email, password}: LoginInput) {
    const user = await UserService.loginUser({email, password})

    if (user) {
      return {
        user,
        token: JwtService.generateToken(user.uuid),
      }
    }

    throw new AuthenticationError('invalid email or password')
  }
}
