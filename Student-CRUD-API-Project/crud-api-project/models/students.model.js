const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  first_name: {
    type : String,
    require: true
  },
  last_name: {
    type : String,
    require: true
  },
  email: {
    type : String,
    require: true,
    unique: true
  },
  phone: {
    type : String,
    require: true
  },
  gender: {
    type : String,
    enum: ['Male','Female','Other'],
    require: true
  },
  profile_pic: {
    type : String
  }
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student

