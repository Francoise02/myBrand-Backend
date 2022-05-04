var express = require('express')
var postController = require('../controllers/postControllers')
var router = express.Router()



 
// add post
router.post("/add_post", postController.add_post)

// lsit all posts
router.get("/posts", postController.get_posts)
 
// retrieve post by ID
router.get("/posts/:postId", postController.retrieve_post)

// retrieve post by ID
router.get("/posts/:postId/comments", postController.retrieve_comments)

router.put("/posts/:postId/upvotes", postController.increment_upvotes)

router.get("/posts/:postId/upvotes", postController.getupvotes)

router.get("/posts/:postId/downvotes", postController.getdownvotes)

router.put('/posts/:postId', postController.editposts)

router.delete('/posts/:postId', postController.deletepost)


module.exports = router