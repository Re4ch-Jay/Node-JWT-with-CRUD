const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// GET SIGNUP PAGE
router.get('/signup', authController.get_signup)
// SIGNUP USER
router.post('/signup', authController.post_signup)
// GET LOGIN PAGE
router.get('/login', authController.get_login)
// LOGIN USER
router.post('/login', authController.post_login)
// LOGOUT USER 
router.get('/logout', authController.get_logout)


module.exports = router