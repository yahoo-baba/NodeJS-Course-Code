import express from 'express'
const app= express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send("Home Page")
})

app.get('/about', (req, res) => {
  var users = [
    {name:'Akshay Kumar',age: 25,city:'Delhi'},
    {name:'Salman Khan',age: 24,city:'Mumbai' },
    {name:'Shahid Kapoor',age: 23 ,city:'Goa'},
    {name:'John Abraham',age: 22 ,city:'Delhi'},
    {name:'Kartrina Kaif',age: 23 ,city:'Agra'}
  ];

  res.render("about", {
                        title:'Home page', 
                        message: "Welcome",
                        items: users
                      })
})

app.get('/form',(req, res) => {
  res.render('form', {message: null})
})

app.post('/submit',(req, res) => {
  const name= req.body.myname

  const message = `Hello, ${name} You submitted the form.`
  res.render('form', {message: message})
})


app.listen(3000,()=>{
  console.log("Server started successfully on port : 3000")
})