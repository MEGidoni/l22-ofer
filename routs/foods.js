const express = require('express');
const { FoodModel , validateFood } = require('../models/FoodModel');
const { auth } = require('../middlewears/auth');
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await FoodModel.find({});
  res.json(data);
})

router.post("/",auth, async (req, res) => {
  const validBody = validateFood(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try {
    console.log(req.body)
    let food = new FoodModel(req.body);
    await food.save();
    res.status(201).json(food);
  }
  catch (err) {
    res.status(502).json(err);
  }
});
router.put("/:id",auth, async (req, res) => {
  const validBody = validateFood(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try {
    console.log(req.body);
    const id = req.params.id;
    const data = await FoodModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
    res.json(data);
  }
  catch (err) {
    res.status(502).json(err);
  }
});
router.delete('/:id',auth,async (req, res) => {
  try {
    const id = req.params.id;
    const data = await FoodModel.deleteOne({_id:id,user_id:req.tokenData._id});
    res.json(data);
  }
  catch (err) {
    res.status(502).json(err);
  }
});
module.exports = router;