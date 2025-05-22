import { IncomingMessage, ServerResponse } from 'http'
import { addUser } from '../functions/addUser'
import { User } from '../types/types'
import { isValidRequest } from '../utils/isValidRequest'

export function addUserController(
  request: IncomingMessage,
  response: ServerResponse,
): void {
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

      const newbie = addUser({ username, age, hobbies })
      response.writeHead(201, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(newbie))
    } catch {
      response.writeHead(400, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: 'Invalid input data' }))
    }
  })
}
