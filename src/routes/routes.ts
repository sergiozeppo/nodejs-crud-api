import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import {
  addUserController,
  deleteUserController,
  getUserIDController,
  getUsersController,
  updateUserController,
} from '../controller'
import { endpoint, endpointMatch } from '../constants/constants'

export function handleRoutes(
  request: IncomingMessage,
  response: ServerResponse,
): void {
  try {
    const { pathname = '' } = parse(request.url || '', true)
    const method = request.method || 'GET'

    if (pathname === endpoint) {
      switch (method) {
        case 'GET':
          return getUsersController(response)
        case 'POST':
          return addUserController(request, response)
      }
    }

    const match = pathname?.match(endpointMatch)
    const id = match?.[1]

    if (id) {
      switch (method) {
        case 'GET':
          return getUserIDController(response, id)
        case 'PUT':
          return updateUserController(request, response, id)
        case 'DELETE':
          return deleteUserController(response, id)
      }
    }

    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'Endpoint not found' }))
  } catch {
    response.writeHead(500, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'Internal server error' }))
  }
}
