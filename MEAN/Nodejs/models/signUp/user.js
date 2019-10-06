const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('../../config/dev');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    designation: {
        type: Schema.Types.ObjectId,
        ref: 'Designation',
    },
    first_Name: { type: String },
    email: { type: [String], text: true },
    mobile: { type: String },
    password: { type: String },
    confirm: { type: String },
    created_Date: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.designation.designation }, config.SECRET);
    return token;
}

function validateUser(user) {
    const schema = {
        first_Name: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.number().required(),
        designation: Joi.string().required(),
        password: Joi.string().required(),
        confirm: Joi
    };
    return Joi.validate(user, schema);
}

const users = mongoose.model('User', userSchema);

module.exports.users = users;
module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;