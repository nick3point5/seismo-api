const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 3001
const routes = require('./routes')

app.use(bodyParser.json())
app.use(express.json());
app.use(cors())
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
	  maxAge: 1000 * 60 * 60 * 2
	}
}));

app.get('/', (req,res) => {
  res.send('success')
})

app.use('/post', routes.post)
app.use('/user', routes.user)

app.listen(PORT, ()=>{
  console.log(
    `Server running in port ${PORT} \nlocal: http://localhost:${PORT}`
  );
})