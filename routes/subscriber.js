var express = require('express')
var subController = require('../controllers/subControllers')
var router = express.Router()

 


// add subscriber
router.post("/add_sub", subController.add_user)

// list all subscribers
router.get("/subscribers", subController.list_users)

// list subscriber by ID
// router.get("/subscribers/:id", subController.retrieve_sub)

module.exports = router