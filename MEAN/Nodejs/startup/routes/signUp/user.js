const error = require('../../../middelware/error');
const express = require('express');

//user  file path
const users = require('../../../routes/signUp/user');

module.exports = function (app) {
    //api reference to the routes
    app.use(express.json());//middle ware

    //user api
    app.use('/api', users);

    app.use(error);


}