
const mongoose = require('mongoose')

const user_Schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    contactNo:{
        type:Number,
        required:true,
        min:10,
    },
    role:{
        type:String,
        default:"admin",
    }
},

{timestamps:true}

)

module.exports= mongoose.model("User", user_Schema);