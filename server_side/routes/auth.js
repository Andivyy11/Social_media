const router= require('express').Router();
const user=require('../models/user')
const bcrypt=require('bcrypt')

//register
router.post('/register' , async (req,res)=>{
    try{
        //create salt and hashpassword
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
    
        //create new user document from posted data
        const u=new user({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });

        //add new user to database
        const usr = await u.save();
        res.json(usr);
    }
    catch(error)
    {
        res.status(500).json(error);
    }
});

//login
router.post('/login' , async (req,res)=>{
    try{
        const u=await user.findOne({email:req.body.email})
        !u && res.status(404).json("user not found");

        const pass=await bcrypt.compare(req.body.password, u.password);
        !pass && res.status(404).json("incorrect password");

        res.status(200).json(u);
    }
    catch(error){
        res.status(505).json(error)
    }
})
module.exports = router;
