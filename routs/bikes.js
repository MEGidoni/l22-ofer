const express = require('express');
const router = express.Router();
const {auth} = require('../middlewears/auth');
const { BikeModel, validBike } = require('../models/BikeModel');

router.get("/", async(req,res) => {
  const limit = req.query.limit <= 20 ? req.query.limit : 20 ;
  const skip = req.query.skip || 0 ;
    try{
        const data = await BikeModel.find({})
        .limit(limit)
        .skip(skip);
        res.json(data);
    }
    catch(err){
        console.error(err);
        res.status(502).json(err);
    }
  });

  router.get("/price", async(req,res) => {
      try{
        const minimum = req.query.minimum || 0 ;
        const maximum = req.query.maximum || 999999 ;
          const data = await BikeModel.find({
            price:{
              $gte:minimum ,
              $lte:maximum
            }
          })
          .limit(20);
          res.json(data);
      }
      catch(err){
          console.error(err);
          res.status(502).json(err);
      }
    });

router.post( "/" , auth , async(req,res) => {
    const validBody = validBike(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try {
    console.log("posted:",req.body);
    let bike = new BikeModel(req.body);
    bike.user_id = req.tokenData._id;
    await bike.save();
    res.status(201).json(bike);
  }
  catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
  });

  router.put("/:id", auth , async (req, res) => {
    const validBody = validBike(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try {
      console.log("puted:",req.body)
      const id = req.params.id;
      const data = await BikeModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(502).json(err);
    }
  });

  router.delete('/:id', auth ,async (req, res) => {
    try {
      console.log("deleted:",req.body);
      const id = req.params.id;
      const data = await BikeModel.deleteOne({_id:id,user_id:req.tokenData._id});
      res.json(data);
    }
    catch (err) {
      res.status(502).json(err);
    }
  });

  module.exports = router;