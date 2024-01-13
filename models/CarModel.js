const mongoose = require('mongoose');
const joi = require('joi');
const carSchema = new mongoose.Schema({
    name:String ,
    color:String ,
    year:Number ,
    user_id:String 
}, {timestamps:true})
exports.CarModel = mongoose.model("cars",carSchema);
exports.validCar = (_reqbody)=>{
    const joischema =joi.object({
        name:joi.string().min(2).max(100).required(),
        color:joi.string().min(2).max(100).required(),
        year:joi.number().min(1900).max(2100).required()
    })
    return joischema.validate(_reqbody);
}