const error = require('../../../middelware/error');
const express = require('express');

const userAuth = require('../../../routes/login/user');

module.exports = function (app) {
    //api reference to the routes
    app.use(express.json());//middle ware

    app.use('/api/',userAuth)

    app.use(error);


}