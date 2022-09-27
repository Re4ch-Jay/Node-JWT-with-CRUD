const express = require('express')
const router = express.Router()
const {requireAuth, checkUser} = require('../middleware/authMiddleware')
const reviewController = require('../controllers/reviewController')

// GET ALL REVIEWS
router.get('/reviews', requireAuth, reviewController.get_review)
// GET REVIEWS PAGE FORM
router.get('/reviews/create', requireAuth,  reviewController.get_create)
// POST REVIEW
router.post('/reviews', requireAuth, reviewController.create_post)
// GET SINGLE REVIEW
router.get('/reviews/:id', requireAuth,  reviewController.get_review_detail)
// DELETE REVIEW
router.delete('/reviews/:id', requireAuth,  reviewController.delete_review)

module.exports = router;