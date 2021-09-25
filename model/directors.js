const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dbDirector = new Schema({
    name:{
        type:String,
        required: true,
    },
    surname:String,
    bio:String,
    dataT:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('director' , dbDirector)
















