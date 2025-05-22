import request from 'supertest'
import { handleRoutes } from '../routes/routes'
import { users } from '../utils/userDB'
import { createServer, Server } from 'http'
import { endpoint } from '../constants/constants'

let mockServer: Server

beforeAll((done) => {
  mockServer = createServer(handleRoutes)
  mockServer.listen(5000, () => done())
  users.length = 0
})

afterAll((done) => {
  mockServer.close(() => done())
})

describe('API test scenarios: ', () => {
  let ID: string

  it('Scenario 1: Get all records with a GET api/users request (an empty array is expected)', async () => {
    const res = await request(mockServer).get(endpoint)
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it('Scenario 2: A new object is created by a POST api/users request (a response containing newly created record is expected)', async () => {
    const newbie = {
      username: 'testUser',
      age: 25,
      hobbies: ['testing', 'coding'],
    }

    const res = await request(mockServer).post(endpoint).send(newbie)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.username).toBe('testUser')
    expect(res.body.age).toBe(25)
    expect(res.body.hobbies).toEqual(['testing', 'coding'])

    ID = res.body.id
  })

  it('Scenario 3: With a GET api/users/{userId} request, we try to get the created record by its id (the created record is expected)', async () => {
    const res = await request(mockServer).get(`${endpoint}${ID}`)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(ID)
    expect(res.body.username).toBe('testUser')
    expect(res.body.age).toBe(25)
    expect(res.body.hobbies).toEqual(['testing', 'coding'])
  })

  it('Scenario 4: We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)', async () => {
    const userUPD = {
      username: 'testUserUPD',
      age: 45,
      hobbies: ['not testing', 'not coding', 'eating', 'drinking'],
    }

    const res = await request(mockServer).put(`${endpoint}${ID}`).send(userUPD)
    expect(res.status).toBe(200)
    expect(res.body.username).toBe('testUserUPD')
    expect(res.body.age).toBe(45)
    expect(res.body.hobbies).toEqual([
      'not testing',
      'not coding',
      'eating',
      'drinking',
    ])
  })

  it('Scenario 5: With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)', async () => {
    const res = await request(mockServer).delete(`${endpoint}${ID}`)
    expect(res.status).toBe(204)

    const getRes = await request(mockServer).get(`${endpoint}${ID}`)
    expect(getRes.status).toBe(404)
  })

  it('Scenario 6: With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)', async () => {
    const res = await request(mockServer).get(`${endpoint}${ID}`)

    expect(res.status).toBe(404)
    expect(res.body.message).toBe(`User with provided ID doesn't exist`)
  })
})
