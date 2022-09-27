const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    recipe: {
        type: String,
        require: true
    },
    incredient:{
        type: String,
        require: true
    }
}, {timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe;