var express = require('express')
var userController = require('../controllers/userControllers')
var router = express.Router()

 
// add user
router.post("/add_user", userController.add_user)

// lsit all users
router.get("/users", userController.list_users)

// update a user
router.put("/users/:_id", userController.edit_users)


// delet a user
// router.delete("/users/:_id", userController.deleteUsers)


// login
router.post("/login", userController.login)


module.exports = router