const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userSchema = new mongoose.Schema({
    name:String ,
    email:String ,
    password:String,
    role:{
        type:String ,default:"user"
    }
});
exports.UsersModel = mongoose.model("users",userSchema);

exports.validUser = (_reqbody)=>{
    const joischema =joi.object({
        name:joi.string().min(2).max(100).required(),
        email:joi.string().min(2).max(100).email().required(),
        password:joi.string().min(3).max(100).required()
    })
    return joischema.validate(_reqbody);
}

exports.validLogIn = (_reqbody)=>{
    const joischema =joi.object({
        email:joi.string().min(2).max(100).email().required(),
        password:joi.string().min(3).max(100).required()
    })
    return joischema.validate(_reqbody);
}

exports.createToken = (user_id,role) => {
    const token = jwt.sign({_id:user_id,role},token,process.env.TOKEN_SECRET,{expiresIn:"300mins"});
    return token;
}