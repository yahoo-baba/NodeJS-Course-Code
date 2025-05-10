const express = require('express')
const app = express()

app.listen(3000, ()=>{
  console.log('Successfully Connected on port 3000.')
})

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {

   res.jsonp({ name: 'YahuBaba', age: 25})
})

app.post('/about', (req, res) => {
  if(req.is('application/json')){
    res.send("Valid JSON Data")
  }else if(req.is('text/html')){
    res.send("HTML Data")
  }else{
    res.status(400).send("Unsupported Content-Type.")
  }
})


