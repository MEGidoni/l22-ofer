const express = require('express');
const { CarModel, validCar } = require('../models/CarModel');
const router = express.Router();
const { auth } = require('../middlewears/auth');

router.get("/", async(req,res) => {
    try{
        const data = await CarModel.find({});
        res.json(data);
    }
    catch(err){
        console.error(err);
        res.status(502).json(err);
    }
  });

router.post("/",auth, async(req,res) => {
    const validBody = validCar(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try {
    console.log("posted:",req.body)
    let car = new CarModel(req.body);
    car.user_id = req.tokenData._id;
    await car.save();
    res.status(201).json(car);
  }
  catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
  });

  router.put("/:id",auth, async (req, res) => {
    const validBody = validCar(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try {
      console.log("puted:",req.body)
      const id = req.params.id;
      const data = await CarModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
      res.json(data);
    }
    catch (err) {
      res.status(502).json(err);
    }
  });

  router.delete('/:id',auth,async (req, res) => {
    try {
      console.log("deleted:",req.body)
      const id = req.params.id;
      const data = await CarModel.deleteOne({_id:id,user_id:req.tokenData._id});
      res.json(data);
    }
    catch (err) {
      res.status(502).json(err);
    }
  });

  module.exports = router;