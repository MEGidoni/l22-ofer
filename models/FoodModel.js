const mongoose = require('mongoose');
const joi = require('joi');
const FoodScheme = new mongoose.Schema({
    name:String ,
    price:Number
})
exports.FoodModel = mongoose.model('foods', FoodScheme);


exports.validateFood=(_reqbody)=>{
    const joischema = joi.object({
        name:joi.string().min(2).max(100).required(),
        price:joi.number().min(1).max(999).required(),
    });
    return joischema.validate(_reqbody);
}