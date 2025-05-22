import { ServerResponse } from 'http'
import { getUsers } from '../functions/getUsers'

export function getUsersController(response: ServerResponse): void {
  const users = getUsers()
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(users))
}
