const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    review: {
        type: String,
        require: true
    },
    snippet: {
        type: String,
        require: true,
    }
}, {timestamps: true})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;