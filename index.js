const express = require('express')
const app = express()

app.use(express.json())

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
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

let info = 
    {
        date: new Date(),
        length: persons.length
    }
