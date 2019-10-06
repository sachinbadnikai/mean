const error = require('../../../middelware/error')
const express = require('express')



//designation
const designation = require('../../../routes/admin/designation')

module.exports = function (app) {
  //api reference to the routes
  app.use(express.json())//middle ware

  //desination
  app.use('/api', designation)
 
  app.use(error)


}
