const express = require('express');
const app = express();

const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(session({
  secret: 'secretpassword',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: 'mongodb://127.0.0.1:27017/sessiondb',
    collectionName : 'mysessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.get('/', (req, res) => {
  if(req.session.username){
    res.send(`<h1>Username from session is : ${req.session.username}</h1>`);
  }else{
    res.send('<h1>No username found in session.</h1>');
  }
});

app.get('/set-username', (req, res) => {
  req.session.username = "YahuBaba"
  res.send('<h1>Username has been set in session.</h1>');
});

app.get('/get-username', (req, res) => {
  if(req.session.username){
    res.send(`<h1>Username from session is : ${req.session.username}</h1>`);
  }else{
    res.send('<h1>No username found in session.</h1>');
  }
});

app.get('/destroy', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.status(500).send('Failed to destroy session')
    }
    res.send('<h1>Session destroy successfully.</h1>');
  })
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});