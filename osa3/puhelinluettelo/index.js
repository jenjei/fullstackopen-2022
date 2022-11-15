console.log('hello backend')

const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (requeste, response) => {
    response.send('<p>Phonebook has info for ' + persons.length + ' people.</p>'
    + '<p></p>' + Date())
  })

  // creating api endpoint for one contact
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id) // Number for turning string to int
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).end() // id not found :(
      }
  })

  // deleting one contact
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = (min, max) => {
    return Math.random() * (max - min) + min
  }

  // creating new person
  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) { // jos nimi puuttuu, niin anna error viesti
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) { // jos numero puuttuu, niin anna error viesti
      return response.status(400).json({
        error: 'number missing'
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(5, 100000000)
    }

    persons = persons.concat(person)

    console.log(person)
    response.json(person)
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)