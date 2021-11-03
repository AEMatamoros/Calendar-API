const { Schema, model} = require('mongoose');

const eventModel = Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'userModel',
        required:true   
    },
    start:{
        type:Date,
        required:true,
    },
    end:{
        type:Date,
        required:true
    },
    event_title:{
        type:String,
        maxLength: 20
    },
    event_description:{
        type:String,
        maxLength:450   
    }
    
})

module.exports =  model('eventModel',eventModel);
