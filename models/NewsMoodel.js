const mongoose = require('mongoose');
const joi = require('joi');
const newsschema = new mongoose.Schema({
    title:String ,
    info:String ,
    category_id:String ,
    img_url:String ,
    likes:{
        type:Number ,default:0
    },
    user_id:String 
}, 
{
    timestamps:true
});
exports.NewsModel = mongoose.model("news",newsschema);
exports.validNews = (_reqbody)=>{
    const joischema =joi.object({
        title:joi.string().min(2).max(100).required(),
        info:joi.string().min(2).max(5000).required(),
        category_id:joi.string().min(2).max(100).required(),
        img_url:joi.string().min(2).max(300).allow(null,"")
    })
    return joischema.validate(_reqbody);
}