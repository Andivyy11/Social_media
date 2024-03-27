const router = require("express").Router();
const Conversation = require("../models/conversation");

//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/chat/:id' , async (req,res)=>{
   try{
      const conv = Conversation.findById(req.params.id)
      res.status(200).json(conv)
   }
   catch(err)
   {
      res.status(503).json(err)
   }
})
router.get('/:id' , async (req,res)=>{
    try{
       const getConversation = await Conversation.find({ members : { $in : [ req.params.id ] }})
       res.status(200).json(getConversation)
    }
    catch(error)
    {
        res.status(503).json(error)
    }
})

module.exports = router;