const express = require('express')
const router = express.Router()
router.use('/', require('./swagger'));
router.use('/api/v1', require('./postRoutes'));
router.use('/api/v1', require('./routes'));
router.use('/api/v1', require('./querryRoutes'))


  
module.exports = router;