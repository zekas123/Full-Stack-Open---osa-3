
const morgan = require('morgan');

const express = require('express');
const app = express()
app.use(express.json());

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res) 
    ].join(' ');
}));

let persons = [
    {
        id: 1,
        name: "John Doe",
        phone: "123-456-7890"
    },
    {
        id: 2,
        name: "Jane Smith",
        phone: "098-765-4321"
    },
    {
        id: 3,
        name: "Bob Johnson",
        phone: "555-555-5555"
    }
];

app.post('/api/persons', (request, response) => {
    const body = request.body


    const randomId = Math.floor(Math.random() * 1000000).toString()

    const newPerson = {
        id: randomId,
        name: body.name,
        phone: body.phone,
    }
    if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({ 
        error: 'name must be unique' 
    })
}
    else {
        persons = persons.concat(newPerson)
        response.json(newPerson)
      }
    
})

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
});

app.get('/api/persons', (req, res) => {
    res.send(persons);
});


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id) 
    res.status(204).end()
})

const PORT = 3001

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
});    
