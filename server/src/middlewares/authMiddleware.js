const userModel = require("../models/authModel")
const jwt = require("jsonwebtoken")



const authUser = async(req, res, next) =>{
    const {token} = req.cookies;
    if(!token){
       return  res.status(401).json({message: "User unauthorized"})
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decode.id)
        req.user =user;
        next();
    }catch(err){
        res.status(401).json({message: "Unauthorized"})
    }
}

module.exports = {authUser}