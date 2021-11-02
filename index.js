require('dotenv').config();
const express = require('express');
const { dbConection } = require('./database/config')

dbConection()
const app = express();

//Public directori
app.use(express.static('public'))
//Parse Body
app.use(express.json());

app.use('/api/auth', require('./routes/auth-routes'))


app.listen(process.env.PORT,(req,res)=>{
    console.log('Server in port 4000')
})