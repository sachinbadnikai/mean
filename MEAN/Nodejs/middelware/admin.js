const config=require('../config/dev');
const jwt=require('jsonwebtoken');

function admin(req,res,next){
   const token= req.header('Authorization');
  // console.log(token);
   if(!token) res.status(401).send('No Token Provided');

   try{
     const decode= jwt.verify(token,config.SECRET);
    
     req.user=decode;
    const role =req.user.role;
   if(req.user.role!=role) return res.status(403).send('access denied');
     next();
   }
  catch(ex){
    res.status(401).send("Invalid Token");
  }
 
}
module.exports=admin;