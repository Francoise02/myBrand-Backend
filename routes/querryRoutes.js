var express = require('express')
var querryController = require('../controllers/querryControllers')
var router = express.Router()

router.route("/add_querry").post(querryController.CreateQuery);
router.route("/querries/:id").delete(querryController.DeleteQuery);
router.route("/querries").get(querryController.GetAllQueries);
router.route("/querries/:id").get(querryController.getQueryById);



module.exports = router