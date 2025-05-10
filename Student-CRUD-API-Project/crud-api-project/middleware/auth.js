const jwt = require('jsonwebtoken')
const User = require('../models/users.models')

const auth = async (req, res, next) => {
  try{
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader)
    if(typeof bearerHeader != 'undefined'){
      const token = bearerHeader.split(' ')[1]
      const user = jwt.verify(token, process.env.JWT_SECRET)
      
      req.token = user
      next()
    }else{
      res.status(401).json({message: 'No token provided'})
    }
  }catch(err){
    res.status(403).json({message: 'Invalid or expired token'})
  }
}

module.exports = auth