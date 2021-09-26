const { Router } = require('express')
const bcryb = require('bcryptjs')
const Schema = require('../model/user')
const jwt = require('jsonwebtoken')
const router = Router()

router.get('/', (req, res) => {
    res.send('method of get')
})

router.post('/register', (req, res) => {
    const { username, password } = req.body
    bcryb.hash(password , 10 , (err , hash)=>{
        const db = new Schema({
        username,
        password: hash,
    })
    const promise = db.save()
    promise.then((data) => res.json(data))
        .catch((err) => console.log(err))
    })
    
})

router.post('/authenticate', (req, res) => {
    const { username, password } = req.body
    Schema.findOne({username} , (err , data)=>{
        if(err)
            throw err
        if(!data)
            res.json({
                status:404,
                message: "username hato kiritilgan"
            }) 
        else{
            bcryb.compare(password , data.password)
            .then(pass => {
                if(!pass){
                    res.json({
                        status:false,
                        message: 'parolingiz hato kiritilgan'
                    })
                }
                else{
                    const server = {username}
                    const token = jwt.sign(
                        server, req.app.get('api_secret_key') , {expiresIn: 720}
                    )
                    res.json({
                        status:true,
                        token
                    })
                }
            })
        }       
    })
  
    
})



module.exports = router












