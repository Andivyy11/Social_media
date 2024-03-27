const post =require('../models/post')
const router= require('express').Router();
const user = require('../models/user')

// create a post
router.post('/' ,async (req,res)=>{
    try{
        const newPost=new post(req.body);
        const p=await newPost.save();
        res.status(200).json(p);
    }
    catch(err)
    {
        res.status(500).json("error while creating a new post");
    }
});

// update a post
router.put('/:id' , async (req,res)=>{
    try{
        const curPost= await post.findById(req.params.id);
        if(req.body.userId === curPost.userId)
        {
            const p= await post.findByIdAndUpdate(req.params.id, { $set : req.body});
             res.status(200).json(p);
        }
        else 
           res.status(500).json("you cannot update post of other users");
    }
    catch(error)
    {
        res.status(500).json(error);
    }
});

//delete a post
router.delete('/:id' , async (req,res)=>{
    try{
        const curPost=await post.findById(req.params.id);
        if( req.body.userId === currPost.userId)
        {
            const p=await post.findByIdAndDelete(req.params.id);
            res.status(200).json("deleted");
        }
        else 
        {
            res.status(200).json("you cannot delete others post")
        }
    }
    catch(error)
    {
      res.status(500).json(error);
    }
});

//like-dislike a post
router.put('/:id/like' , async (req,res)=>{
    try{
        const curPost=await post.findById(req.params.id);
        if(curPost.likes.includes(req.body.userId))  //dislike the post
        {
            const r=await curPost.updateOne( { $pull : { likes : req.body.userId}});
            res.status(200).json(r);
        }
        else{        //like post
            const r=await curPost.updateOne( { $push : { likes : req.body.userId}});
            res.status(200).json(r);
        }
    }
    catch(error)
    {
        res.status(500).json("error while like/dislike a post");
    }
});
router.put('/:id/heart' , async (req,res)=>{
    try{
        const curPost=await post.findById(req.params.id);
        if(curPost.hearts.includes(req.body.userId))  //dislike the post
        {
            const r=await curPost.updateOne( { $pull : { hearts : req.body.userId}});
            res.status(200).json("0");
        }
        else{        //like post
            const r=await curPost.updateOne( { $push : { hearts : req.body.userId}});
            res.status(200).json("1");
        }
    }
    catch(error)
    {
        res.status(500).json("error while like/dislike a post");
    }
});

//get a post
router.get('/:id' , async (req,res)=>{
    try{
        const currPost =await post.findById(req.params.id)
        res.status(200).json(currPost);
    }
    catch(error)
    {
        res.status(500).json("error")
    }
})

//get all post of a user
router.get('/allPosts/:name' , async (req,res)=>{
    try{
        const currentUser= await user.findOne({username: req.params.name});
        const allPosts = await post.find({ userId : currentUser._id})
        res.status(200).json(allPosts);
    }
    catch(error)
    {
        res.status(500).json("cant fetch individual posts");
    }
});

router.get('/timeline/:id', async (req,res)=>{
    try{
       const currentUser= await user.findById(req.params.id);
       const currentUserPosts = await post.find({ userId : currentUser._id});
       const friendsPosts = await Promise.all(
        currentUser.following.map(friendId => {
            return post.find({ userId : friendId});
        })
       )
       res.status(200).json(currentUserPosts.concat(...friendsPosts));
    }
    catch(error)
    {
        res.status(500).json("error while fetching posts");
    }
})
module.exports =router