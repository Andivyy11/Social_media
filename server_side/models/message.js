const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        conversationId:{
            type:String
        },
        senderId:{
            type:String
        },
        text:{
            type:String
        }
    },
    {timestamp : true }
)

module.exports = mongoose.model('Message' , messageSchema)