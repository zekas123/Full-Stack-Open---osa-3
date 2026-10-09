const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

//
const url =
  `mongodb+srv://zekas:${password}@cluster0.m0li5t8.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({

  name: { type: String, minlength: 3 },
  number: { type: String, minlength: 3 },
})

const Person = mongoose.model('Person', personSchema)

// Vain salasana annettu -> listataan kaikki numerot
if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  // Salasana + nimi + numero -> lisätään uusi yhteystieto
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`added ${name} number ${number}`)
    mongoose.connection.close()
  })
}
