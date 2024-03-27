const router = require('express').Router();
const conversation = require('../models/conversation');
const Message = require('../models/message')

router.post('/' , async (req,res) =>{
    const mssg = new Message(req.body)
    try{
       const getMssg = await mssg.save()
       res.status(200).json(getMssg)
    }
    catch(error)
    {
        res.status(503).json(error)
     }
})

router.get('/:conversationId' , async (req,res) => {
    try{
        const chats = await Message.find({ conversationId : { $eq : req.params.conversationId }})
        res.status(200).json(chats)
    }
    catch(error)
    {
        res.status(503).json(error)
    }
})

module.exports = router;
