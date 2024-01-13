const mongoose = require('mongoose');
const joi = require('joi');
const phoneSchema = new mongoose.Schema({
    name:String ,
    screen_size:Number ,
    battery_mah:Number ,
    price:Number ,
    date:{
        type:Date , default:Date.now
    } ,
    user_id:String 
})
exports.PhoneModel = mongoose.model("phones",phoneSchema);
exports.validPhone = (_reqbody)=>{
    const joischema =joi.object({
        name:joi.string().min(2).max(100).required(),
        screen_size:joi.number().min(320).max(7000).required(),
        battery_mah:joi.number().min(100).max(10000).required() ,
        price:joi.number().min(1).max(10000).required()
    })
    return joischema.validate(_reqbody);
}