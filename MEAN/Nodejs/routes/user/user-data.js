const userAuth=require('../../middelware/user');

const express=require('express');
const router=express.Router();
const controllerUserDetails=require('../../controller/user/user-data');


router.get('/user-detail',controllerUserDetails.userDetailGetAll);

router.get('/user-detail/:user_id',controllerUserDetails.userDetailGetByUserId);

router.get('/user-detailById/:id',controllerUserDetails.userDetailGetById);

router.post('/user-detail',controllerUserDetails.userDetailPost);

router.put('/user-detail/:id',userAuth,controllerUserDetails.userDetailUpdate);

router.delete('/user-detail/:id',userAuth,controllerUserDetails.userDetailDelete);


module.exports=router;