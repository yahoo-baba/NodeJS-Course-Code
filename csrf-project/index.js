const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const csrf = require('csurf')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs');

app.use(cookieParser())
const csrfProtection = csrf({ cookie : true })

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
});

app.get('/myform', csrfProtection, (req, res) => {
  res.render("myform", { csrfToken: req.csrfToken()})
});

app.post('/submit', csrfProtection, (req, res) => {
  res.send(req.body)
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});