const _ = require('lodash');
const userModel = require('../models/users')
const express = require("express");
const User = require("../models/users");
const app = express();
const jwt = require('jsonwebtoken')

// Endpoint to add a new user
exports.add_user = async (request, response) => {

    console.log(request.body)
    // await User.save();
        // response.send(User);
    try{ 
      
        const user = await User.create({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password


        })
        await user.save();
        response.status(200).json({status: 'ok',user})
        
    } 
    catch (error) {
        //   response.status(500).send(error){message:error};
          response.status(500).send({ message: error.toString()})
        }


};

// Retrieve users 
exports.list_users = async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
};


exports.login = async (request, response) => {
    const user = await userModel.findOne({
        email: request.body.email,
        password: request.body.password,
    })

    if (user) {

            const token = jwt.sign(
            {
                email: user.email
            }, 
            'topsecret250'
        )

        return response.json({status:"ok", user: token })
    } else {
        return response.json({status:"error", user: false })
    }
}



//Edit a user
exports.edit_users = async (request, response) => {
    if(!request.body) {
        response.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = request.params._id;
    
    await postModel.findByIdAndUpdate(id, request.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            return response.status(404).send({
                message: `There is no user at id: ${id}`
            });
        }else{
           
            //return res.status(204);
             return response.status(200).send({
             success: true,
             message: "User updated successfully."
           
            
      }) 
      return;
        }
    }).catch(err => {
        response.status(500).send({
            message: err.message
        });


    }
    
    
    
    );



};

// Exporting the endpoints
// module.exports = app;