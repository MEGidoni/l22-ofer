const express = require('express');
const router = express.Router();
const { auth } = require('../middlewears/auth');
const { BookModel, validBook } = require('../models/BookModel');

router.get("/", async(req,res) => {
    const limit = req.query.limit <= 20 ? req.query.limit : 5 ;
    const skip = req.query.skip || 0 ;
    const sort = req.query.sort || "_id" ;
    const reverse = req.query.reverse == "yes" ? 1 : -1 ;
    try{
        const data = await BookModel.find({})
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
        const count = await BookModel.countDocuments({});
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
        const data = await BookModel.find({
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
    const validBody = validBook(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try {
    console.log("posted:",req.body);
    let book = new BookModel(req.body);
    book.user_id = req.tokenData._id;
    await book.save();
    res.status(201).json(book);
  }
  catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
  });

  router.put("/:id", auth , async (req, res) => {
    const validBody = validBook(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try {
      console.log("puted:",req.body)
      const id = req.params.id;
      const data = await BookModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
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
      const data = await BookModel.deleteOne({_id:id,user_id:req.tokenData._id});
      res.json(data);
    }
    catch (err) {
      res.status(502).json(err);
    }
  });

  module.exports = router;