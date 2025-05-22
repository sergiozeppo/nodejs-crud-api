import { createServer } from 'http'
import { config } from 'dotenv'
import { handleRoutes } from './routes/routes'

config()

const PORT = process.env.PORT || 5000

const server = createServer((request, response) => {
  request.on('error', (error) => {
    console.error('Request error:', error)
    response.writeHead(400, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'Bad Request' }))
  })

  response.on('error', (error) => {
    console.error('Response error:', error)
  })

  handleRoutes(request, response)
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

server.on('error', (error) => {
  console.error('Server error:', error)
})
