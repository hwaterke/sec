import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {WorkoutSet} from './workout_set.entity'
import {WorkoutSetsResolver} from './workout_sets.resolver'
import {WorkoutSetsService} from './workout_sets.service'

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutSet])],
  providers: [WorkoutSetsResolver, WorkoutSetsService],
})
export class WorkoutSetsModule {}
