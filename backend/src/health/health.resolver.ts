import {Query, Resolver} from '@nestjs/graphql'
import {nodeEnv} from '../config/env'
import {HealthObjectType} from './types/health.type'

@Resolver()
export class HealthResolver {
  @Query(() => HealthObjectType)
  health(): HealthObjectType {
    return {
      nodeEnv: nodeEnv(),
    }
  }
}
