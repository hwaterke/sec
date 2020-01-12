import {Authorized, Ctx, Query, Resolver} from 'type-graphql'
import {User} from '../../database/entities/User'
import {Context} from '../types'

@Resolver()
export class MeResolver {
  @Authorized()
  @Query(() => User)
  me(@Ctx() context: Context) {
    return context.user
  }
}
