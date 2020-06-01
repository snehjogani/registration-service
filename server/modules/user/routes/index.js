const express = require('express');
const router = express.Router();
const controllers = require('@User/controllers');

router.post('/register', controllers.register);

router.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.baseUrl}`);
});

module.exports = router
