const express = require('express');
const app = express();
const {body, validationResult} = require("express-validator")

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

var validationRegistration = [
  body('username')
    .notEmpty().withMessage("Username is required.")
    .isLength({ min:3}).withMessage("Username must be at least 3 characters long.")
    .trim()
    .isAlpha().withMessage("Username must contain only letters.")
    .custom(value => {
      if(value === 'admin'){
        throw new Error('Username "admin" is not allowed.')
      }
      return true
    })
    .customSanitizer(value => value.toLowerCase()),
  body('useremail')
    .isEmail().withMessage("Please provide a valid Email Id.")
    .normalizeEmail(),
  body('userpass')
    .isLength({ min:5, max:10}).withMessage("Password must be between 5 and 10 character long.")
    .isStrongPassword().withMessage('Password must be strong.'),
  body('userage')
    .isNumeric().withMessage("Age must be numeric.")
    .isInt({min:18} ).withMessage("Age must be at least 18 years old."),
  body('usercity')
    .isIn(['Delhi','Mumbai','Goa', 'Agra'])
    .withMessage("City must be Delhi, Mumbai, Goa or Agra.")
]

app.get('/myform', (req, res) => {
  res.render('myform', {errors: 0});
})

app.post('/saveform', validationRegistration ,(req, res) => {
  const error = validationResult(req)
  if(error.isEmpty()){
    res.send(req.body);
  }

  res.render("myform", {errors: error.array()})
 
});

app.listen(3000, () => {
  console.log('Express Server starts on port 3000!');
});
