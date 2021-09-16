const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    category:String,
    country:String,
    year:Number,
    director_id:Schema.Types.ObjectId,
    imdb_score:Number
})
module.exports = mongoose.model('Movies' , MovieSchema)



















