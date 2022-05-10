const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes");
const PostRouter = require("./routes/postRoutes");
const UserRouter = require("./routes/routes");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors())

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
  .use('/', require('./routes/routeServer'));


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



app.use('/api/v1', UserRouter);
app.use('/api/v1', PostRouter);

const PORT = process.env.PORT || 8000;


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

module.exports = app;

