const _ = require('lodash');
const subModel = require('../models/subscriber')
const express = require("express");;
const app = express();
const jwt = require('jsonwebtoken')
const signtoken = require('../middleware/auth')

// Endpoint to add a new subscriber
exports.add_user = async (request, response) => {

    console.log(request.body)

    try {

        const user = await subModel.create({
            fullname: request.body.fullname,
            email: request.body.email,


        })
        await user.save();
        response.status(200).json({ message: "Subscribed!"})

    }
    catch (error) {
        //   response.status(500).send(error){message:error};
        response.status(500).send({ message: error.toString() })
    }


};

// Retrieve subscribers 
exports.list_users = async (request, response) => {
    const subscribers = await subModel.find({});

    try {
        response.send(subscribers);
    } catch (error) {
        response.status(500).send(error);
    }
};


exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const userFound = await subModel.findOne({ email: email })


        if (userFound) {
            const token = signtoken({
                userId: userFound.id,
                username: userFound.username
            })
            res.status(201).json({
                messsage: `Thank you for contacting us ${userFound.username}. 
                We will get back to you shortly! `,
                token: token
            })
        }
        else {
            res.status(404).json({
                message: "User not found. Please register to send a querry"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "User not found",
            error: error
        })
    }

    // Retrieve a sub by ID
    exports.retrieve_sub = async (request, response) => {
        try {
            const subId = request.params.subId
            console.log(subId)
            const subscriber = await subModel.findById({ _id: subId });


            if (subscriber) {
                return response.status(200).json({
                    success: true,
                    data: subscriber,
                });
            } else {
                return response.status(404).json({
                    success: false,
                    message: `There is no subscriber at id: ${subId}`
                });
            }

        } catch (error) {
            // response.status(500).send(error);
            response.status(500).send({ message: error.toString() });
        }
    };

}