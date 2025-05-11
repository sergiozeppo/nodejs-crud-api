import { User } from '../types/types'
import { users } from '../utils/userDB'

export function getUsers(): User[] {
  return users
}
