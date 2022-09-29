const User = require('../models/User')
const jwt = require('jsonwebtoken')
const handleError = require('./errorController')
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


// createToken
const maxAge = 3 * 24 * 60 * 60
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: maxAge //second
    })
}

const get_signup = (req, res) =>{   
    res.render('auth/signup', {title: 'Sign Up'})
}

const get_login = (req, res) =>{
    res.render('auth/login', {title: 'Login'})
}

const post_signup = async (req, res) =>{
    const {email, username, password} = req.body;

    try{
        const user = await User.create({email, username, password});
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}) //milesecond
        res.status(201).json({user: user._id})
    }
    catch(err) {
        const errors = handleError(err)
        res.status(400).json({errors})
    }
}

const post_login = async (req, res) =>{
    const {email, password} = req.body

    try {
        const user = await User.login(email, password) // this is parameters of custom login not object
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}) //milesecond
        res.status(200).json({user: user._id})
    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({ errors })
    }
}

const get_logout = (req, res) =>{
    res.cookie('jwt', '', {maxAge: 1}) // 1 milesecond
    res.redirect('/')
}


module.exports = {
    get_login,
    post_login,
    get_signup,
    post_signup,
    get_logout
}