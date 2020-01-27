import {UserService} from './services/UserService'
import {ExerciseService} from './services/ExerciseService'
import {getRepository} from 'typeorm'
import {User} from './database/entities/User'

export const loadMockData = async () => {
  const userRepo = getRepository(User)
  const mainUser = await userRepo.find({where: {email: 'harold@example.com'}})

  if (mainUser) {
    return
  }

  const user = await UserService.createUser({
    email: 'harold@example.com',
    password: '12345678',
    firstName: 'Harold',
    lastName: 'Waterkeyn',
  })

  for (let i = 0; i < 10; i++) {
    await ExerciseService.create({
      name: `Exercise ${i}`,
      muscle: 'Chest',
      user,
    })
  }
}
