import { User } from '../types/types'
import { v4 as uuidv4 } from 'uuid'
import { users } from '../utils/userDB'

export function addUser(data: Omit<User, 'id'>): User {
  const newbie: User = { id: uuidv4(), ...data }
  users.push(newbie)
  return newbie
}
