const express = require('express');
const router = express.Router();
const { auth } = require('../middlewears/auth');
const { NewsModel, validNews } = require('../models/NewsMoodel');

router.get("/", async(req,res) => {
    const limit = req.query.limit <= 20 ? req.query.limit : 5 ;
    const skip = req.query.skip || 0 ;
    const sort = req.query.sort || "_id" ;
    const reverse = req.query.reverse == "yes" ? 1 : -1 ;
    const user_id = req.query.user_id;
    const category_id = req.query.category_id;
    let filterFind = {};
    if(user_id){
      filterFind = { user_id }
    }
    if(category_id){
      filterFind = { ...filterFind , category_id }
    }
    try{
        const data = await NewsModel.find(filterFind)
        .limit(limit)
        .skip(skip)
        .sort({[sort]:reverse});
        res.json(data);
    }
    catch(err){
               console.error(err);
               res.status(502).json(err);
    }
  });

  router.get("/count", async(req,res) => {
    try{
        const limit = req.query.limit <= 20 ? req.query.limit : 5 ;
        const count = await NewsModel.countDocuments({});
        res.json({count,pages:Math.ceil(count/limit)});
    }
    catch(err){
        console.error(err);
        res.status(502).json(err);
    }
  });

  router.get("/search", async(req,res) => {
    const queryS = req.query.s;
    const searchRegExP = new RegExp ( queryS , "i" ) ;
    try{
        const data = await NewsModel.find({
            $or:
            [    {title:searchRegExP}   ,   {info:searchRegExP}    ]
            });
        res.json(data);
    }
    catch(err){
        console.error(err);
        res.status(502).json(err);
    }
  });

router.post( "/" , auth , async(req,res) => {
    const validBody = validNews(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try {
    console.log("posted:",req.body);
    let news = new NewsModel(req.body);
    news.user_id = req.tokenData._id;
    await news.save();
    res.status(201).json(news);
  }
  catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
  });

  router.put("/:id", auth , async (req, res) => {
    const validBody = validNews(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try {
      console.log("puted:",req.body)
      const id = req.params.id;
      let data;
      if(req.tokenData.role=="admin"){
        data = await NewsModel.updateOne({_id:id},req.body);
      }
      else{
        data = await NewsModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
      }
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
      let data;
      if(req.tokenData.role=="admin"){
        data = await NewsModel.deleteOne({_id:id});
      }
      else{
        data = await NewsModel.deleteOne({_id:id,user_id:req.tokenData._id});
      }
      res.json(data);
    }
    catch (err) {
      res.status(502).json(err);
    }
  });

  module.exports = router;