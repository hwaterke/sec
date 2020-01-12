import {getRepository} from 'typeorm'
import {User} from '../database/entities/User'
import {RegisterInput} from '../graphql/auth/RegisterInput'
import bcrypt from 'bcrypt'

export const UserService = {
  createUser: async (input: RegisterInput) => {
    const repository = getRepository(User)

    const hashedPassword = await bcrypt.hash(input.password, 12)

    const user = repository.create({...input, password: hashedPassword})
    return repository.save(user)
  },

  findUser: (uuid: string) => {
    const repository = getRepository(User)
    return repository.findOneOrFail({uuid})
  },

  loginUser: async ({email, password}: {email: string; password: string}) => {
    const repository = getRepository(User)
    const user = await repository
      .createQueryBuilder('user')
      .select()
      .addSelect('user.password')
      .where({email})
      .getOne()

    if (user) {
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        return user
      }
    }

    return null
  },
}
