const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username :{
    type: String,
    require: true,
    unique: true
  },
  userpassword:{
    type: String,
    require:true
  }
})

module.exports = mongoose.model('User', userSchema)