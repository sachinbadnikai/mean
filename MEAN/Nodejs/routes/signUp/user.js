const express=require('express');
const router=express.Router();
const userController=require('../../controller/signUp/user')

router.post('/user',userController.userPost);


module.exports=router;