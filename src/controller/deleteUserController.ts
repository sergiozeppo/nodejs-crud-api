import { ServerResponse } from 'http'
import { validate } from 'uuid'
import { deleteUser } from '../functions/deleteUser'

export function deleteUserController(
  response: ServerResponse,
  id: string,
): void {
  if (!validate(id)) {
    response.writeHead(400, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'userId is invalid (not uuid)' }))
    return
  }

  const isDelete = deleteUser(id)

  if (isDelete) {
    response.writeHead(204)
    response.end(
      JSON.stringify({
        message: 'User deleted successfully',
      }),
    )
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(
      JSON.stringify({ message: `User with provided ID doesn't exist` }),
    )
  }
}
