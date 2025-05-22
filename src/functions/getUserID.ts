import { User } from '../types/types'
import { users } from '../utils/userDB'

export function getUserID(id: string): User | undefined {
  return users.find((user) => user.id === id)
}
