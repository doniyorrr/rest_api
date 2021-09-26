const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        minlength: 5
    }
})


module.exports = mongoose.model('user' , userSchema)