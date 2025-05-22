import { User } from '../types/types'
import { users } from '../utils/userDB'

export function updateUser(id: string, data: Omit<User, 'id'>): User | null {
  const updateID = users.findIndex((user) => user.id === id)
  if (updateID !== -1) {
    users[updateID] = { id, ...data }
    return users[updateID]
  }
  return null
}
