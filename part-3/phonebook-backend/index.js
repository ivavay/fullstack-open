const express = require('express')
const app = express()

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

// Get single person by ID (exercise 3.3)
app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(p => p.id === request.params.id)

    if (person) {
    response.json(person)
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