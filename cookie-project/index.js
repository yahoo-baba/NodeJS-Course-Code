const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser('mySecretKey123'))

app.get('/', (req, res) => {
    var home = `Home Page`;
    const username = req.cookies.username;
    if(!username){
      res.send(`${home} : No cookie found`);
    }
    res.send(`${home} : Cookie found: ${username}`);
});

app.get('/set-cookie', (req, res) => {
  res.cookie('username','Yahu Baba',
    {
      maxAge: 900000, //1000 * 60 * 15 = 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
      signed: true
    }
  )
  res.send(`Cookie has been set`);
});

app.get('/get-cookie', (req, res) => {
  // const username = req.cookies.username;
  const username = req.signedCookies.username;
  if(!username){
    res.send(`No cookie found`);
  }
  res.send(`Cookie found: ${username}`);
});

app.get('/delete-cookie', (req, res) => {
  res.clearCookie('username');
  res.send(`Cookie has been deleted`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});