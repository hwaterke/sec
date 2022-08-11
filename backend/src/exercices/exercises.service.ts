import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Exercise} from './exercise.entity'
import {ExerciseInput} from './exercise.input'

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise) private exerciseRepository: Repository<Exercise>
  ) {}

  getAllForUser({userUuid}: {userUuid: string}) {
    return this.exerciseRepository.find({where: {user: {uuid: userUuid}}})
  }

  getOneForUser({uuid, userUuid}: {uuid: string; userUuid: string}) {
    return this.exerciseRepository.findOneOrFail({
      where: {uuid, user: {uuid: userUuid}},
    })
  }

  create(
    exerciseInput: ExerciseInput & {user: {uuid: string}}
  ): Promise<Exercise> {
    const exercise = this.exerciseRepository.create(exerciseInput)
    return this.exerciseRepository.save(exercise)
  }

  async update({
    uuid,
    payload,
  }: {
    uuid: string
    payload: ExerciseInput
  }): Promise<Exercise> {
    await this.exerciseRepository.update(uuid, payload)
    return this.exerciseRepository.findOneByOrFail({uuid})
  }

  remove({uuid}: {uuid: string}) {
    return this.exerciseRepository.delete(uuid)
  }
}
