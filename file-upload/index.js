const express = require('express');
const app = express();
const multer = require('multer')
const path = require('path')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, './uploads')
  },
  "filename": (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname)
    cb(null, newFileName)
  }
})

//file.mimetype.startsWith('image/')
const fileFilter = (req, file, cb) => {
  if(file.fieldname === 'userfile'){
    if(file.mimetype =='image/jpeg'  || file.mimetype == 'image/png'){
      cb(null, true)
    }else{
      cb(new Error('Only images are allowed!'), false)
    }
  }else if(file.fieldname === 'userdocuments'){
    if(file.mimetype =='application/pdf'){
      cb(null, true)
    }else{
      cb(new Error('Only PDF are allowed for documents'), false)
    }
  }else{
    cb(new Error('Unknown Field.'), false)
  }

  
}

const upload = multer({
  storage : storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter : fileFilter
})

app.get('/', (req, res) => {
  res.render("myform")
})

// app.post('/submitform',upload.array('userfile', 3),(req, res) =>{
//   if(!req.files || req.files.length === 0){
//     return res.status(400).send(`No file uploaded.`)
//   }

//    res.send(req.files)
// })

app.post('/submitform',upload.fields([
  {name :'userfile', maxCount:1},
  {name :'userdocuments', maxCount:3}
]),(req, res) =>{
  if(!req.files || req.files.length === 0){
    return res.status(400).send(`No file uploaded.`)
  }

   res.send(req.files)
})

app.use((error,req, res, next) => {
  if(error instanceof multer.MulterError){
     if(error.code === 'LIMIT_UNEXPECTED_FILE'){
      return res.status(400).send(`Error : Too many files uploaded!`)
     }
    return res.status(400).send(`Multer error: ${error.message} : ${error.code}`)
  }else if(error){
    return res.status(500).send(`Something went wrong: ${error.message}`)
  }
  next()
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});