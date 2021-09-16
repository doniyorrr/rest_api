const {Router} = require('express')
const Schema = require('../model/Schema')
const router = Router()

router.get('/' , (req , res)=>{
     Schema.find({})
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})


router.post('/' , (req , res)=>{
    // const {name , category , year , country , imdb_score} = req.body
    const db = new Schema(req.body)
        // name,
        // category,
        // year,
        // country,
        // imdb_score,
        // name:"merlin",
        // category:"fantastic",
        // year:"2000",
        // country:"usa",
        // imdb_score:8.1
    // })
    db.save()
    .then((data) =>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router







