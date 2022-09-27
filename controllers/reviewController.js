const Review = require('../models/Review')

const get_review = (req, res) => {
   Review.find().sort()
    .then(result => res.render('reviews/review', {title: "Reviews", reviews: result}))
    .catch(err => console.log(err))
}

const get_create = (req, res) => {
    res.render('reviews/create', {title: "Post Review"})
}

const get_review_detail = (req, res) => {
    const id = req.params.id
    Review.findById(id)
        .then(result => {
            res.render('reviews/detail', {title: "Review Detail", review: result})
        })
        .catch(err => {
            console.log(err)
            res.status(400).render('404', {title: "404"})
        })
}

const create_post =(req, res) => {
    const review = new Review(req.body)
    review.save()
        .then(result => {
            res.redirect('/reviews')
        })
        .catch(err => console.log(err))
}

const delete_review = async (req, res) => {
    const id = req.params.id
    Review.findByIdAndDelete(id)
        .then(result => {
            res.redirect('/reviews')
        })
        .catch(err => {
            console.log(err)
        })
    
}
module.exports = {
    get_review,
    get_create,
    get_review_detail,
    create_post,
    delete_review
}