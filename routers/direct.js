const {Router } = require('express')
const directors = require('../model/directors')
const mongoose = require('mongoose')
const router = Router()

router.post('/' , (req  , res)=>{
    const db = new directors(req.body) 
    const promise = db.save()
    promise.then(data => res.json(data))
    .catch(err => console.log(err))
})

// router.get('/' , (req  , res)=>{
//     directors.find({})
//     .then(data => res.json(data))
//     .catch(err =>console.log(err))
 
// })


router.get('/' , (req  , res)=>{
    const promise = directors.aggregate([
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'film',
            }
        },
        {
            $unwind:{
                path: '$film',
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    bio:'$bio'
                },
                film:{
                    $push:'$film'
                }
            }
        },
        {
            $project:{
                _id:"$_id.id",
                name:"$_id.name",
                bio:"$_id.bio",
                film:"$film",
            }
        }
    ])
    promise.then(data => res.json(data))
    .catch(err => console.log(err))
 
})



router.get('/:director_id' , (req  , res)=>{
    const promise = directors.aggregate([
        {
            $match:{
                "_id" : mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'film',
            }
        },
        {
            $unwind:{
                path: '$film',
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    bio:'$bio'
                },
                film:{
                    $push:'$film'
                }
            }
        },
        {
            $project:{
                _id:"$_id.id",
                name:"$_id.name",
                bio:"$_id.bio",
                film:"$film",
            }
        }
    ])
    promise.then(data => res.json(data))
    .catch(err => console.log(err))
 
})






module.exports = router



