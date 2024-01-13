const express = require('express');
const router = express.Router();

router.get("/", async(req,res) => {
    res.json({msg:"express work 19 !"});
  })



router.get("/test", async(req,res) => {
    if (req.cookies["myCookie_meg"]){
        res.json({msg:"you have cookie : "+req.cookies["myCookie_meg"]});
  }
  else{
    res.json({msg:"You need to send cookie!"})
    }
  })


router.get("/create", async(req,res) => {
    res.cookie("myCookie_meg","meg1",{
        httpOnly:false , 
        expires : new Date(Date.now()+1000*60*60*24)
    }).json({msg:"express work 19 !"});
  })

router.get("/delete", async(req,res) => {
    res.clearCookie("myCookie_meg").json({msg:"cookie deleted!"});
  })

  module.exports = router;