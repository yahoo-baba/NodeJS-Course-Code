const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/users.model');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/users_demo')
.then(() => console.log('Database Connected!'));

// Get all users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});

app.listen(3000, () => console.log('Server started'));
