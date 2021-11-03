const { Schema, model } = require('mongoose');

const userModel = new Schema({
    first_name:{
        type:String, 
        required:true,
        trim:true,
    },
    last_name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String, 
        required:true
        //,unique:true
    },
    password:{
        type:String, 
        required:true
    },
    active:{
        type:Boolean,
        default: true,
    },
    date_created:{
        type:Date,
        default:Date.now()
    }
})

module.exports = model('userModel', userModel)