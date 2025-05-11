import { IncomingMessage, ServerResponse } from 'http'
import { addUser } from '../functions/addUser'

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

      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
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
