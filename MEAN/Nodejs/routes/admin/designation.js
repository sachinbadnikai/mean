const express=require('express');
const router=express.Router();
const controllerDesignation=require('../../controller/admin/designation');


router.get('/designation',controllerDesignation.designationGetAll);

router.post('/designation',controllerDesignation.designationPost);

router.put('/designation/:id',controllerDesignation.designationUpdate);

router.delete('/designation/:id',controllerDesignation.designationDelete);


module.exports=router;