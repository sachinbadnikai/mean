const error = require('../../../middelware/error')
const express = require('express')


//userdata path
const userdata = require('../../../routes/user/user-data')

module.exports = function (app) {
  //api reference to the routes
  app.use(express.json())//middle ware

  //userdata
  app.use('/api', userdata)
 
  app.use(error)


}
