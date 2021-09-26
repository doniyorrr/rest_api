const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const port = 3000
const path = require('path')
const r_Index = require('./routers/index')
const r_Director = require('./routers/direct')
const r_User = require('./routers/regUser')
const token = require('./midleware/verify')
const app = express()

//==================== settings mongoose
mongoose.connect('mongodb+srv://doniyor:123qwe123qwe@cluster0.vbpjj.mongodb.net/test')

const db = mongoose.connection

db.on('open' , ()=>{
    console.log(`Mongoose running`)
})

db.on('error' , (err)=>{
    console.log(`Mongoose error running` , err)
})


//============================== setting bodyParser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.set('api_secret_key' , config.api_secret_key)


// ========================== engine technology
app.set('view engine' , 'pug')
app.set('views' , path.join(__dirname , "views"))

app.use(r_User)
app.use(token)
app.use('/api/movies' , r_Index)
app.use('/api/directors' , r_Director)

app.listen(port , () =>{
    console.log(`server http://localhost:${port} da ishladi`)
})







