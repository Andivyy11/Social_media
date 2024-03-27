const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    username :{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true 
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true 
    },
    password:{
        type:String,
        require:true,
        min:8
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    description:{
        type:String
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array, 
        default:[]
    },
    idAdmin:{
        type:Boolean
    },
    city:{
        type:String,
        max:40
    },
    state:{
        type:String,
        max:40
    },
    relationship:{
        type:Number,
        enum:[ 1,2,3]
    }
},
  { timestamps : true}
)

module.exports = mongoose.model('user',userSchema)