const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

// protecting routes
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(err){
                res.redirect('/login')
                console.log(err.message)
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

// check current user

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.locals.user = null
                next()
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken._id)
                res.locals.user = user
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}


module.exports = {requireAuth, checkUser}