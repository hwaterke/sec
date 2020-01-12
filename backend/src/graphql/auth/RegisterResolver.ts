import {Args, Mutation, Resolver} from 'type-graphql'
import {User} from '../../database/entities/User'
import {UserService} from '../../services/UserService'
import {RegisterInput} from './RegisterInput'

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Args() input: RegisterInput): Promise<User> {
    return UserService.createUser(input)
  }
}
