const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const Person=require('../person');
//token verification middleware
const jwtauthmiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token) return res.status(401).json({error:"Unauthorized"});
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:"Invalid token"});
    }
}
//token generation
const tokengeneration=(userdata)=>{
    return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:"20s"});
}
module.exports={jwtauthmiddleware,tokengeneration};