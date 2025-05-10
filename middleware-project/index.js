const express = require('express');
const app = express();

app.get('/',(req, res) => {
  res.send("<h1>Home Page</h1>")
});

app.get('/about', (req, res) => {
  res.send("<h1>About Page</h1>")
});

app.use((req,res) =>{
  res.send("<h1>Error 404: Page Not Found.</h1>")
})

app.use((err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send("Something Broke!")
  next()
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});