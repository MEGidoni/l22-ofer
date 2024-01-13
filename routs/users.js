const express = require('express');
const bcrypt = require('bcrypt');
const { UsersModel , validUser , validLogIn , createToken } = require('../models/UsersModel');
const { auth, authAdmin } = require('../middlewears/auth');
const router = express.Router();

router.get("/", async(req,res) => {
    res.json({msg:"Users EndPoint!"});
  });

router.get("/list" , authAdmin , async(req,res) => {
    try{
      const data = await UsersModel.find({},{password:0});
      res.json(data);
    }
    catch(err){
      res.status(502).json({err});
    }
  });

  router.post("/", async(req,res) => {
    const validBody = validUser(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try {
      console.log("posted: ",req.body);
      let User = new UsersModel(req.body);
      User.password = await bcrypt.hash(User.password , 10);
      await User.save();
      User.password = " ******************************** " ;
      res.status(201).json(User);
    }
    catch (err) {
      if (err.code==11000){
        return res.status(400).json({message: "Email Already Exists",code:11000});
      }
      res.status(502).json(err);
    }
  });

  router.post( '/login', async (req, res) => {
    const validBody = validLogIn(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try{
      const user = await UsersModel.findOne({email: req.body.email});
      if(!user){
        return res.status(401).json({error: 'Email Not Found'});
      }
      const validpassword = await bcrypt.compare(req.body.password,user.password);
      if(!validpassword){
        return res.status(401).json({error: 'wrong password'});
      }
      const newToken = createToken(user.id, user.role);
      res.cookie(
        "token",newToken,
        {
        httpOnly: false,
        expires:new Date(Date.now() + 1000 * 60 * 60 * 24)
        }
      )
      .json({msg:"logged in successfully!",token:newToken});
    }
    catch(err){
      res.status(500).json({err});
    }
  });

  router.get( "/userinfo" , auth , async(req,res) => {
    let User_data = await UsersModel.findOne({_id:req.tokenData._id},{password:0});
    res.json({msg:"sucsses connection!",User_data});
  });


  module.exports = router;