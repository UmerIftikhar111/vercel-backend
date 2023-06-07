
const jwt = require('jsonwebtoken')
require('dotenv').config()


let checkRole=(Role)=>{
    return (req,res,next)=>{
        if( req.decoded.role==Role){
            next();
        }else{
            res.status(401).send({"message":`You are not authorized`})
        }
    }
}

let verifyuserloggedin=(req,res,next)=>{
    let token = req.headers['token'];
    jwt.verify(token, process.env.secret_key , (err, decoded) =>{
        if(!err){
            req.decoded = decoded;
            next();         
        }else{
            res.status(401).send({"message":"Not loggen in"})
        }
    })
}

let validate=(req,res,next)=>{
    let token = req.headers['token'];
    jwt.verify(token, process.env.secret_key , (err, decoded) =>{
        if(!err){
            req.decoded = decoded;
            res.json({message:"Valid token"})         
        }else{
            res.status(401).send({"message":"Not loggen in"})
        }
    })
}

module.exports={
    verifyuserloggedin,checkRole, validate
}