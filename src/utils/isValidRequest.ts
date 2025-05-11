import type { User } from '../types/types.js'

export const isValidRequest = (data: Omit<User, 'id'>) => {
  const verdict =
    typeof data.username === 'string' &&
    typeof data.age === 'number' &&
    Array.isArray(data.hobbies) &&
    data.hobbies.every((hobby) => typeof hobby === 'string')
  return verdict
}
