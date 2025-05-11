import { ServerResponse } from 'http'
import { validate } from 'uuid'
import { getUserID } from '../functions/getUserID'

export function getUserController(response: ServerResponse, id: string): void {
  if (!validate(id)) {
    response.writeHead(400, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'userId is invalid (not uuid)' }))
    return
  }

  const user = getUserID(id)
  if (user) {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(user))
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(
      JSON.stringify({ message: `User with provided ID doesn't exist` }),
    )
  }
}
