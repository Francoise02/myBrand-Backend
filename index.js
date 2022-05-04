const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes")
const PostRouter = require("./routes/postRoutes")
const UserRouter = require("./routes/routes")
const cors = require('cors')
const jwt = require('jsonwebtoken')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(cors())

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "API Documentation",
      description: "Detailed API Information",
      contact: {
        name: "Francoise"
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["index.js"]
  // apis:    ['.routes/*.js']
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * definitions:
 *  post:
 *   type: object
 *   properties:
 *    title:
 *     type: String
 *     description: name of the blog post
 *     example: 'Java is coffee'
 *    content:
 *     type: String
 *     description: content of the blog post
 *     example: 'Java is enjoyable OOP programming language'
 *    dateTime:
 *     type: date
 *     description: date when the blog post was posted
 *     example: '2022-04-23'
 *    upvotes:
 *     type: Number
 *     description: the number of upvotes a post have
 *     example: 439
 *    downvotes:
 *     type: Number
 *     description: the number of downvotes a post have
 *     example: 23
 *    category:
 *     type: array
 *     description: the category a blog belong to
 *     example: ["programming", "java", "coding"]
 *    comments:
 *     type: array
 *     description: An array of comments to a blog post
 *     example: []
 *  User:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: name of the user
 *     example: 'Fanny'
 *    email:
 *     type: string
 *     description: email of the user
 *     example: 'Fanny@gmail.com'
 *    password:
 *     type: string
 *     description: the password of a user
 *     example: '******'
 *  Comment:
 *   type: object
 *   properties:
 *    _id:
 *     type: string
 *     description: id of the comment
 *     example: 2
 *    timePosted:
 *     type: date
 *     description: the data when a comment was posted
 *     example: 2022-03-12
 */

/**
















































// Routes
/**
 * @swagger
 * /api/v1/posts:
 *  get:
 *    description: Use to request all posts
 *    responses:
 *      '200':
 *        description: A successful response
 */
PostRouter.get

/**
 * @swagger
 * /api/v1/posts/:postID:
 *  get:
 *    description: Use to request all posts
 *    responses:
 *      '200':
 *        description: A successful response
 */
 PostRouter.get


/**
 * @swagger
 * /api/v1/add_post:
 *  post:
 *    description: Use to add new post
 *    responses:
 *      '200':
 *        description: A successful response
 */
 PostRouter.post


// /**
//  * @swagger
//  * /api/v1/posts/:postId:
//  *     put:
//  *      description: Use to update a specific post
//  *    parameters:
//  *       name: customer
//  *        in: query
//  *        description: Name of our post
//  *        required: false
//  *        schema:
//  *            "./models/posts"
//  *    responses:
//  *      '201':
//  *        description: Successfully updated a post 
//  */
//  PostRouter.put

 /**
 * @swagger
 * /api/v1/posts/{postId}:
 *  put:
 *   summary: update a post
 *   description: update a post
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: postId
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the post
 *      example: "626eb680d1369f83c8e183e5"
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/post'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/post'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/post'
 */
PostRouter.put

 /**
 * @swagger
 * /api/v1/posts/:postId:
 *  delete:
 *    description: Use to delete a post by ID
 *    responses:
 *      '200':
 *        description: A successful response
 */
  PostRouter.delete


  /**
 * @swagger
 * /api/v1/users:
 *  get:
 *    description: Use to get all posts
 *    responses:
 *      '200':
 *        description: A successful response
 */
UserRouter.get

/**
 * @swagger
 * /api/v1/user/:userID:
 *  get:
 *    description: Use to request a user by ID
 *    responses:
 *      '200':
 *        description: A successful response
 */
 UserRouter.get

 /**
 * @swagger
 * /api/v1/add_user:
 *  post:
 *    description: Use to add new user
 *    responses:
 *      '200':
 *        description: A successful response
 */
UserRouter.post

/**
 * @swagger
 * /api/v1/users/:userID:
 *  put:
 *    description: Use to request all posts
 *    responses:
 *      '200':
 *        description: A successful response
 */
 UserRouter.put

 /**
 * @swagger
 * /api/v1/users/_id:
 *  delete:
 *    description: Use to request all posts
 *    responses:
 *      '200':
 *        description: A successful response
 */
UserRouter.delete

const username = "Francoise";
const password = "root";
const cluster = "cluster0";
const dbname = "myBrand";

mongoose.connect(
  process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@${cluster}.ov7s3.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/', (req, res) => {
  res.send('https://app.swaggerhub.com/apis/cloners/Reddit/1.0.0')
});

app.use('/api/v1',UserRouter);
app.use('/api/v1',PostRouter);

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});