require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.generateToken = (payload,passwordReset=false ) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {
        //add expiration to the token if its reset password or not\
        expiresIn: passwordReset ? process.env.PASSWORD_RESET_TOKEN_EXPIRATION : process.env.LOGIN_TOKEN_EXPIRATION
    })
}