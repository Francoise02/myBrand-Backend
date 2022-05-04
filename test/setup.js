/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const moongose = require ('mongoose');
const blogModel = require ('../models/posts.js');
const userModel = require ('../models/users.js');



const DB_TEST = "mongodb+srv://Francoise:root@cluster0.ov7s3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

 moongose.connect(DB_TEST).then(() => console.log('Successfully connected to the Testing db!'));

beforeEach(done => {
  userModel.deleteMany({}, function(err) {});
  blogModel.deleteMany({}, function(err) {});
  done();
});

afterEach(done => {
  userModel.deleteMany({}, function(err) {});
  blogModel.deleteMany({}, function(err) {});
  done();
});
