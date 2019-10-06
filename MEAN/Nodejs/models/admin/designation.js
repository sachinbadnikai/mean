const Joi=require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const designationSchema = new Schema({
    designation:{type:String,required:true,unique:true},  
    status: {type:Boolean}, 
    Created_date: {type : Date, default : Date.now},
});

   function validateDesignation(designation){
    const schema={
        designation:Joi.string().required().max(250),
        status:Joi.boolean()
       };
       return Joi.validate(designation,schema);
    }

    const designation=mongoose.model('Designation',designationSchema);
 
    module.exports.designation=designation;
    module.exports.validateDesignation=validateDesignation;