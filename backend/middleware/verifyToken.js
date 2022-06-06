const jwt = require('jsonwebtoken')
const verifyToken = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    try{
       const {userId} =  jwt.verify(authorization,"khalidmansoor")
        req.user = userId
        next()  
    }catch(err){
        return res.status(401).json({error:"you must be logged in"})
    }
}
module.exports = verifyToken