const mongoose= require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})

module.exports=mongoose.model("user",userSchema)