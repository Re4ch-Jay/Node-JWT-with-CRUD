const recipeController = require('../controllers/recipeController')
const express = require('express')
const router = express.Router()
const {requireAuth, checkUser} = require('../middleware/authMiddleware')

// GET ALL RECIPES 
router.get('/coffee', requireAuth,recipeController.get_coffee)
// GET CREATE PAGE
router.get('/coffee/create',requireAuth,recipeController.get_create)
// POST A RECIPE
router.post('/coffee',requireAuth, recipeController.post_coffee)
// GET A SINGLE RECIPE
router.get('/coffee/:id',requireAuth, recipeController.get_detail)
// DELETE A COFFEE
router.delete('/coffee/:id',requireAuth, recipeController.delete_coffee)

module.exports = router;