const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())


morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res),
    ].join(' ')
  }))


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => {
        return person.id === id
    })
    response.json(person)
})

app.get('/info', (request, response) => {
    const date = new Date()
    console.log(date)
    const length = persons.length
    response.write('<h1>Phonebook has info for ')
    response.write(JSON.stringify(length))
    response.write(' people</h1>')
    response.write('<h2>Time and Date of request:')
    response.write(JSON.stringify(date))
    response.write('</h2>')
    response.end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === body.name) {
            return response.status(400).json({
                error: 'name already added'
            })
        }
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
      }
    
      persons = persons.concat(person)
      response.json(person)
})

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})