const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const Secret = process.env.JWT_SECRET
const signtoken = (payload) => {
    try {
        return jwt.sign(payload, Secret, {expiresIn: "1d"})
    } catch (er) {
        console.log(er)
    }
}
module.exports = signtoken;