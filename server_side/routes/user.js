const router= require('express').Router();
const user=require('../models/user')
const bcrypt=require('bcrypt');
const mongoose = require('mongoose');

// get details of a user

router.get('/getById/:id' , async (req,res)=>{
     try{
          const u=await user.findById(req.params.id);
          res.status(200).json(u);
     }
     catch(error)
     {
         res.status(500).json("more to hunt");
     }
})
router.get('/getByName/:username' , async (req,res)=>{
     try{
          const u=await user.findOne({username: req.params.username});
          res.status(200).json(u);
     }
     catch(error)
     {
         res.status(500).json("more to hunt");
     }
})
// router.get("/", async (req, res) => {
//      const uId = req.query.userId;
//      const usr = req.query.username;
//      try {
//        const u={};
//        if(uId)
//        {
//           console.log('user id exists');
//           u=await user.findById(uId);
//        }
//        else 
//           u= await user.findOne({ username: usr });
//        const { password, updatedAt, ...other } = u._doc;
//        res.status(200).json(other);
//      } 
//      catch (error) 
//      {
//        res.status(500).json(error);
//      }
//    });

// update a user
router.put('/:id' , async (req,res)=>{
     if(req.body.userId === req.params.id || req.user.isAdmin)
     {
          try
          {
             if(req.body.password)
             { 
               const salt= await bcrypt.genSalt(10);
               req.body.password= await bcrypt.hash(req.body.password,salt);
             }
               const u= await user.findByIdAndUpdate(req.params.id, { $set : req.body,});
               res.status(200).json("account updated successfully");
          }
          catch(err)
          {
               res.status(500).json("error while updating account");
          }
     }
     else 
         res.status(403).json("you can update only your account")
});

router.delete('/:id', async (req,res)=>{
     if(req.body.userId === req.params.id || req.user.isAdmin)
     {
          try{
               const u=await user.findByIdAndDelete(req.params.id)
               res.status(200).json(u);
          }
          catch(error)
          { 
              res.status(500).json('error while deleting',error)
          }
     }
     else 
     {
         res.status(403).json("id mismatch")
     }
})

//follow a user

router.put("/:id/follow", async (req, res) => {
     if (req.body.userId !== req.params.id) {
       try {
         const person = await user.findById(req.params.id);
         const me = await user.findById(req.body.userId);
         if (!person.followers.includes(me._id)) {
           await person.updateOne({ $push: { followers: me._id } });
           await me.updateOne({ $push: { following: person._id } });
           res.status(200).json("user has been followed");
         } else {
           res.status(403).json("you allready follow this user");
         }
       } catch (err) {
         res.status(500).json('error');
       }
     } else {
       res.status(403).json("you cant follow yourself");
     }
   });
   
   //unfollow a user
   
   router.put("/:id/unfollow", async (req, res) => {
     if (req.body.userId !== req.params.id) {
       try {
        const person = await user.findById(req.params.id);
        const me = await user.findById(req.body.userId);
        if(me.following.includes(person._id)) 
        {
          await person.updateOne({ $pull: { followers: me._id } });
          await me.updateOne({ $pull: { following: person._id } });
          res.status(200).json("user has been unfollowed ");
        }
        else
        {
          res.status(403).json("you dont follow this user");
        }
        }catch (err) {
         res.status(500).json(err);
       }
     } else {
       res.status(403).json("you cant unfollow yourself");
     }
   });


// get name and profile of friends of user
router.get('/getFriends/:id' ,async (req,res)=>{
    try{
       const currentUser=await user.findById(req.params.id)
       const friends = await Promise.all(
          currentUser.following.map(friendId => {
                 return user.findById(friendId)
          })
         )
         var friendList=[]
         friends.forEach( frnd => {
             const { _id , username , profilePicture} = frnd
             friendList.push({ _id , username , profilePicture})
         })
         res.status(200).json(friendList);
    }
    catch(error)
    {
      res.status(500).json([])
    }
})

router.get('/getRecommendedUser/:id', async (req,res)=>{
     try
     {
         const currentUser = await user.findById(req.params.id);

         const result = await user.find({ _id : { $nin: [ ...currentUser.following , req.params.id] } }).sort({followers: -1}).limit(5);
         var List=[]
         result.forEach( usr => {
             const { _id , username , profilePicture} = usr
             List.push({ _id , username , profilePicture})
         })
         res.status(200).json(List);
     }
     catch(error)
     {
          res.status(500).json(error);
     }
});
module.exports = router;