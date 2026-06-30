const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// Middlewares 
const cors = require('cors')
app.use(cors())

morgan.token('body', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Get all persons (exercise 3.1)
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Add a new person (exercise 3.5 + 3.6)
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name is missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number is missing' })
  }

  // If name already exists in the phonebook 
  if (persons.some(p => p.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

// Get single person by ID (exercise 3.3)
app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(p => p.id === request.params.id)

    if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
 
})

// Delete a person by ID (exercise 3.4)
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const index = persons.findIndex(p => p.id === id)

  if (index !== -1) {
    persons.splice(index, 1)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

// Info (includes timestamp of request) (exercise 3.2)
app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  response.send(info)

  
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
