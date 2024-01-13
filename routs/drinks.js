const express = require('express');
const { DrinkModel, validateDrink } = require('../models/DrinkModel');
const { auth } = require('../middlewears/auth');
const router = express.Router();
router.get("/", async (req, res) => {
    const data = await DrinkModel.find({});
    res.json(data);
  })
  
  router.post("/", auth , async (req, res) => {
    const validBody = validateDrink(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try {
      console.log(req.body)
      let drink = new DrinkModel(req.body);
      await drink.save();
      res.status(201).json(drink);
    }
    catch (err) {
      res.status(502).json(err);
    }
  });
  router.put("/:id",auth, async (req, res) => {
    const validBody = validateDrink(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try {
      console.log(req.body);
      const id = req.params.id;
      const data = await DrinkModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
      res.json(data);
    }
    catch (err) {
        console.log(err);
      res.status(502).json(err);
    }
  });
  router.delete('/:id',auth,async (req, res) => {
    try {
      const id = req.params.id;
      const data = await DrinkModel.deleteOne({_id:id,user_id:req.tokenData._id});
      res.json(data);
    }
    catch (err) {
        console.log(err);
      res.status(502).json(err);
    }
  });
  module.exports = router;