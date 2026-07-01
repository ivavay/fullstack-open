const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()

require('dotenv').config()

const url = process.env.MONGODB_URI

if (!url) {
  console.log('MONGODB_URI is missing')
  process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    console.log(`connected to MongoDB database ${mongoose.connection.name}`)
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(express.static('dist'))

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
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  }).catch(error => next(error))
})

// Add a new person (exercise 3.5 + 3.6)
app.post('/api/persons', async (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name is missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number is missing' })
  }

  try {
    // const existingPerson = await Person.findOne({ name: body.name })

    // if (existingPerson) {
    //   return response.status(400).json({ error: 'name must be unique' })
    // }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    const savedPerson = await person.save()
    response.json(savedPerson)
  } catch (error) {
    next(error)
  }
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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Delete a person by ID (exercise 3.4)
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Info (includes timestamp of request) (exercise 3.2)
app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  response.send(info)

  
})

// Error handling middleware
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  return response.status(500).json({ error: 'database error' })
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
