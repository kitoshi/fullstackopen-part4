const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fullstack:nBsiTpwVtSXmQy7@cluster0.4qsoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const password = process.argv[2]

const mongoose = require('mongoose')

const url =
  `mongodb+srv://fullstack:${password}@cluster0.4qsoy.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const persons = new Person({
    id: Person.length + 1,
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}


if (process.argv.length > 3) {
  persons.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}


if (process.argv.length < 4) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })  
}


