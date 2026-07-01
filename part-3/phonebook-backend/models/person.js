const mongoose = require('mongoose')

const phoneNumberValidator = (number) => {
  return /^\d{2,3}-\d+$/.test(number)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: phoneNumberValidator,
      message: props => `${props.value} is not a valid phone number`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
