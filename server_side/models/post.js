const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
    {
    "userId":{
        type:String,
        required:true
    },
    "description":{
        type:String,
        max:100,
    },
    "img":{
        type:String
    },
    "likes":{
        type:Array,
        default:[]
    },
    "hearts":{
        type:Array,
        default:[]
    },
    "comments":{
        type:Number,
    }
},
    { timestamps:true }
);

module.exports = new mongoose.model('post' , postSchema)