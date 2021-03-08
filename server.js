const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes')

const PORT = process.env.PORT || 3001

const app = express();

app.use(bodyParser.json())
app.use(express.json());
app.use(cors())

app.get('/', (req,res) => {
  res.send('success')
})

app.use('/post', routes.post)
app.use('/user', routes.user)

app.listen(PORT, ()=>{
  console.log(
    `Server running in port ${PORT}`
  );
})



