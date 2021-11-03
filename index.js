require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config')

dbConection()
const app = express();
//Cors
app.use(cors());
//Public directory 
app.use(express.static('public'))
//Parse Body
app.use(express.json());
//Routes
app.use('/api/auth', require('./routes/auth-routes'))


app.listen(process.env.PORT,(req,res)=>{
    console.log('Server in port 4000')
})