const express = require('express');
const router = express.Router();
const {auth} = require('../middlewears/auth');
const { PhoneModel, validPhone } = require('../models/PhoneModel');

router.get("/", async(req,res) => {
    try{
        const data = await PhoneModel.find({});
        res.json(data);
    }
    catch(err){
        console.error(err);
        res.status(502).json(err);
    }
  });

router.post( "/" , auth , async(req,res) => {
    const validBody = validPhone(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try {
    console.log("posted:",req.body);
    let phone = new PhoneModel(req.body);
    phone.user_id = req.tokenData._id;
    await phone.save();
    res.status(201).json(phone);
  }
  catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
  });

  router.put("/:id", async (req, res) => {
    const validBody = validPhone(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try {
      console.log("puted:",req.body)
      const id = req.params.id;
      const data = await PhoneModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(502).json(err);
    }
  });

  router.delete('/:id',async (req, res) => {
    try {
      console.log("deleted:",req.body);
      const id = req.params.id;
      const data = await PhoneModel.deleteOne({_id:id,user_id:req.tokenData._id});
      res.json(data);
    }
    catch (err) {
      res.status(502).json(err);
    }
  });

  module.exports = router;