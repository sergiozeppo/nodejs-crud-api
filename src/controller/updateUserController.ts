import { IncomingMessage, ServerResponse } from 'http'
import { validate } from 'uuid'
import { getUserID } from '../functions/getUserID'
import { updateUser } from '../functions/updateUser'
import { User } from '../types/types'
import { isValidRequest } from '../utils/isValidRequest'

export function updateUserController(
  request: IncomingMessage,
  response: ServerResponse,
  id: string,
): void {
  if (!validate(id)) {
    response.writeHead(400, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'userId is invalid (not uuid)' }))
    return
  }

  const user = getUserID(id)
  if (!user) {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(
      JSON.stringify({ message: `User with provided ID doesn't exist` }),
    )
    return
  }

  let data = ''

  request.on('data', (chunk) => {
    data += chunk
  })

  request.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(data)
      const isValid = isValidRequest({ username, age, hobbies } as Omit<
        User,
        'id'
      >)

      if (!isValid) {
        response.writeHead(400, { 'Content-Type': 'application/json' })
        response.end(
          JSON.stringify({
            message: 'Request body does not contain required fields',
          }),
        )
        return
      }

      const upUser = updateUser(id, { username, age, hobbies })
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(upUser))
    } catch {
      response.writeHead(400, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: 'Invalid input data' }))
    }
  })
}
