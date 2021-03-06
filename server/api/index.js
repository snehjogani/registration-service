const express = require('express');
const apiRoutes = express()

const UserRoutes = require('@User/routes')

apiRoutes.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.baseUrl}`)
})

apiRoutes.use('/users', UserRoutes)

module.exports = apiRoutes