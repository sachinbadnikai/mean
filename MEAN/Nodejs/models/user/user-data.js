const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailSchema = new Schema({
    name: { type: String},
    email: { type: String},
    url: { type: String},
    mobile_no:{ type: String},
    gender:{ type: String},
    description:{ type: String},
    date: { type: Date},
    time:{type: String},
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    Created_date: { type: Date, default: Date.now },
});

function validateuserDetails(userDetail) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required(),
        url: Joi.string().required(),
        mobile_no:Joi.number().required(),
        gender:Joi.string().required(),
        description:Joi.string().required(),
        date: Joi.date().required(),
        time:Joi.string().required()
    };
    return Joi.validate(userDetail, schema);
}

const userDetails = mongoose.model('userDetail', userDetailSchema);

module.exports.userDetails = userDetails;
module.exports.validateuserDetails = validateuserDetails;
