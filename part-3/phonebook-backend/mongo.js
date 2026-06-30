const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

// Connection string 
const url = `mongodb+srv://phonebook-user:${password}@cluster0.03hlzyx.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Handle missing password
if (process.argv.length < 3) {
  console.log('Please provide password as argument')
  process.exit(1)
}

// If only password is provided, display all entries in the phonebook
if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('Phonebook:')
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

// If name and password are provided, add a new entry to the phonebook
const person = new Person({
  name,
  number,
})

person.save().then(() => {
  console.log(`Added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})