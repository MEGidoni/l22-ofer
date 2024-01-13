const mongoose = require('mongoose');
const joi = require('joi');
const drinkSchema = new mongoose.Schema({
    name:String ,
    price:Number ,
    calories:Number ,
    img:String
});
exports.DrinkModel = mongoose.model("drinks",drinkSchema);
exports.validateDrink = (_reqbody)=>{
    const joischema =joi.object({
        name:joi.string().min(2).max(100).required(),
        price:joi.number().min(1).max(999).required(),
        calories:joi.number().min(0).max(5000).required() ,
        img:joi.string().min(2).max(400).required(),
    })
    return joischema.validate(_reqbody);
}