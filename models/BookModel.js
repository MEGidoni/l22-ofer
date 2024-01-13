const mongoose = require('mongoose');
const joi = require('joi');
const bookschema = new mongoose.Schema({
    name:String ,
    info:String ,
    pages:Number ,
    price:Number ,
    age:Number ,
    user_id:String 
}, 
{
    timestamps:true
});
exports.BookModel = mongoose.model("books",bookschema);
exports.validBook = (_reqbody)=>{
    const joischema =joi.object({
        name:joi.string().min(2).max(100).required(),
        info:joi.string().min(2).max(5000).required(),
        pages:joi.number().min(2).max(1000).required(),
        price:joi.number().min(2).max(1000).required(),
        age:joi.number().min(0).max(5784).required()
    })
    return joischema.validate(_reqbody);
}