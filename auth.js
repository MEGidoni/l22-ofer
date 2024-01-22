const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.auth = (req, res, next) => {
    // const token = req.header("x-api-key");
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({msg:"Token Needed!"});
    }
    try{
      const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET);

      req.tokenData = decodeToken;
      next();
    }
    catch (err) {
      res.status(401).json({err:"Token invalid or expired!"});
    }
  };

exports.authAdmin = (req, res, next) => {
    // const token = req.header("x-api-key");
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({msg:"Token Needed!"});
    }
    try{
      const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET);

      if(decodeToken.role != "admin"){
        return res.status(401).json({msg:"you must be an admin to access this page!"});
      }
      req.tokenData = decodeToken;
      next();
    }
    catch (err) {
      res.status(401).json({err:"Token invalid or expired!"});
    }
  };