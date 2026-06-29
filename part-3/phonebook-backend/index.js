const http = require('http')

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

// For exercise 3.1
const app = http.createServer((request, response) => {
  if (request.url === '/api/persons') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(persons))
    return
  }

  // For exercise 3.2
  if (request.url === '/info') {
    const date = new Date()
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(info)
    return
  }
  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ error: 'Not found' }))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)