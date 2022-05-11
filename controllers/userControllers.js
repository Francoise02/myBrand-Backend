const _ = require('lodash');
const userModel = require('../models/users')
const express = require("express");
const User = require("../models/users");
const app = express();
const jwt = require('jsonwebtoken')
const signtoken = require ('../middleware/auth')

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
        response.status(200).json({message: "Successfully added user"})
        
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


exports.login = async (req, res) => {
    try {
        let {email, password} = req.body;
        const userFound = await userModel.findOne({ email: email})


        if (userFound) {
            if (password == userFound.password){
            const token = signtoken({
                userId: userFound.id,
                username: userFound.username
            })
            res.status(201).json({
                messsage: `welcome ${userFound.username}`,
                token: token
            })}
            else {
                res.status(403).json({
                    message: "Incorrect password"
                })
            }
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "User not found",
            error: error
        })
    }
    // const user = await userModel.findOne({
    //     email: request.body.email,
    //     password: request.body.password,
    // })



    // if (user) {

    //         const token = jwt.sign(
    //         {
    //             email: user.email
    //         }, 
    //         'topsecret250'
    //     )
    //     // return response.redirect('dashboard.html')
    //     return response.json({status:"ok", user: token })
    // } else {
    //     return response.json({status:"error", user: false })
    // }
}



//Edit a user
// exports.edit_users = async (request, response) => {
//     if(!request.body) {
//         response.status(400).send({
//             message: "Data to update can not be empty!"
//         });
//     }
    
//     const id = request.params._id;
    
//     await postModel.findByIdAndUpdate(id, request.body, { useFindAndModify: false }).then(data => {
//         if (!data) {
//             return response.status(404).send({
//                 message: `There is no user at id: ${id}`
//             });
//         }else{
           
//             //return res.status(204);
//              return response.status(200).send({
//              success: true,
//              message: "User updated successfully."
           
            
//       }) 
//       return;
//         }
//     }).catch(err => {
//         response.status(500).send({
//             message: err.message
//         });


//     }
    
    
    
//     );



// };

// // Delete a user
// exports.delete_user = async (request, response) => {
//     try{ 
//     // look up course, not found raise 404
//       const userId = request.params._id
//       console.log(userId)
      
//       const post = await postModel.findByIdAndRemove({ _id: userId }); 
    
//     if(post) {
    
//       console.log("deleted!");
    
//       // return res.status(204)
//       response.status(204).send({
//             message: "Data to update can not be empty!"
//         });
//     }
   
//     else {
//       return response.status(204).json({
//       success: false,
//       message: `There is no post at id: ${userId}`
//       }) 
//     }
  
//      } catch(error) {
//         //   response.status(500).send(error);
//           response.status(500).send({ message: error.toString()});
//   }
// };

// Exporting the endpoints
// module.exports = app;