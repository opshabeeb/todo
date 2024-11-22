const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        
    },
    password:{
        type:String,
        required:true,
    },
    todo:[{
        type:mongoose.Types.ObjectId,
        ref:'todo',
    }]
})

module.exports=mongoose.model('User',userSchema)