const express = require('express')

const app = express()

app.use(express.json())

let notes = [
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

app.post('/api/persons', (request, response) => {
    const body = request.body


    const randomId = Math.floor(Math.random() * 1000000).toString()

    const newPerson = {
        id: randomId,
        name: body.name,
        number: body.number,
    }
    console.log(newPerson);
    if (notes.some(note => note.name === body.name)) {
    return response.status(400).json({ 
        error: 'name must be unique' 
    })
}
    else {
        notes = notes.concat(newPerson)
        response.json(newPerson)
      }
    
})

app.get('/api/persons', (request, response)=>{
    response.send(notes)
})

app.get('/info', (request, response) =>{
  const now = new Date();
  response.send (`<h2>Phonebook has info for ${notes.length} people</h2>
    <h2> ${now}</h2>
    `)
  
})

app.get('/api/persons/:id',(request, response) =>{
    const id = Number(request.params.id)
    const note = notes.find(note => note.id == id)
    if (note){
        response.json(note.number)
    }   else {
        response.status(404).end()
        
    }
    
})




app.delete('/api/notes/:id', (request, response) =>{
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`server is running on port:${PORT}`)
})
