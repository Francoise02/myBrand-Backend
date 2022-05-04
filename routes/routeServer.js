const express = require('express')
const router = express.Router()
router.use('/', require('./swagger'));
router.use('/posts', require('./postRoutes'));
router.use('/users', require('./routes'));

  
module.exports = router;