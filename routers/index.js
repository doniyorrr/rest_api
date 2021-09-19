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
//  | Get a movie. 
router.get('/:movie_id' , (req , res)=>{
    Schema.findById(req.params.movie_id)
   .then((data)=>{
       res.json(data)
   })
   .catch((err)=>{
       console.log(err)
   })
})

// | Update a movie with new info. |
router.put('/:movie_id' , (req , res)=>{
    Schema.findByIdAndUpdate(req.params.movie_id , req.body)
   .then((data)=>{
       res.json(data)
   })
   .catch((err)=>{
       console.log(err)
   })
})

// | Delete a movie. |
router.delete('/:movie_id' , (req , res)=>{
    Schema.findByIdAndRemove(req.params.movie_id )
   .then((data)=>{
       res.json(data)
   })
   .catch((err)=>{
       console.log(err)
   })
})

// |Get the top 10 movies. |
router.get('/top/top10' , (req , res)=>{
    Schema.find({}).limit(10).sort({imdb_score: -1 })
   .then((data)=>{
       res.json(data)
   })
   .catch((err)=>{
       console.log(err)
   })
}) 

// | Movies between two dates. |
router.get('/:start_year/:end_year' , (req , res)=>{
    const {start_year , end_year} = req.params
    Schema.find({
        year:{'$gte':parseInt(start_year) , "$lte":parseInt(end_year)}
    })
   .then((data)=>{
       res.json(data)
   })
   .catch((err)=>{
       console.log(err)
   })
})












module.exports = router







