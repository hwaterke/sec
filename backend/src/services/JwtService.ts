import jwt from 'jsonwebtoken'
import {DateTime} from 'luxon'
import {UserService} from './UserService'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const JwtService = {
  generateToken: (uuid: string) => {
    const token = jwt.sign(
      {uuid, iat: DateTime.local().toSeconds()},
      JWT_SECRET
    )
    return `Bearer ${token}`
  },

  getUserFromToken: async (token: string) => {
    const content = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET) as {
      uuid: string
    }

    return await UserService.findUser(content.uuid)
  },
}
