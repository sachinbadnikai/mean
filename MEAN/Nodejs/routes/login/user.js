const express=require('express');
const router=express.Router();
const userController=require('../../controller/login/user')

router.post('/user-authentication',userController.userAuthPost);

module.exports=router;