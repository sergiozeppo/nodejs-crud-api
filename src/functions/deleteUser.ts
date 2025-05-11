import { users } from '../utils/userDB'

export function deleteUser(id: string): boolean {
  const deleteID = users.findIndex((user) => user.id === id)
  if (deleteID !== -1) {
    users.splice(deleteID, 1)
    return true
  }
  return false
}
