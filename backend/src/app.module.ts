import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {GraphQLModule} from '@nestjs/graphql'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthModule} from './auth/auth.module'
import {getDatabaseConfig} from './config/database.config'
import {isProduction} from './config/env'
import {ExercisesModule} from './exercices/exercises.module'
import {HealthModule} from './health/health.module'
import {WorkoutSetsModule} from './workout_sets/workout_sets.module'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return getDatabaseConfig(config)
      },
    }),
    GraphQLModule.forRoot({
      debug: !isProduction(),
      playground: !isProduction(),
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    HealthModule,
    AuthModule,
    ExercisesModule,
    WorkoutSetsModule,
  ],
})
export class AppModule {}
