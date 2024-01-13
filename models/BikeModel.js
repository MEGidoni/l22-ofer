const mongoose = require('mongoose');
const joi = require('joi');
const bikeschema = new mongoose.Schema({
    name:String ,
    price:Number ,
    year:Number ,
    user_id:String 
}, {timestamps:true})
exports.BikeModel = mongoose.model("bikes",bikeschema);
exports.validBike = (_reqbody)=>{
    const joischema =joi.object({
        name:joi.string().min(2).max(100).required(),
        price:joi.number().min(2).max(25000).required(),
        year:joi.number().min(1900).max(2100).required()
    })
    return joischema.validate(_reqbody);
}