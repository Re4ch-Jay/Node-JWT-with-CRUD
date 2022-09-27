const Recipe = require('../models/Recipe')

const get_coffee = (req, res) => {
    Recipe.find()
        .then(result => res.render('recipe/coffee', {title: "Coffees", coffees: result}))
        .catch(err => console.log(err))
}

const get_create = (req, res) => {
    res.render('recipe/create', {title: "Create"})
}

const post_coffee = (req, res) => {
    const coffee = new Recipe(req.body)
    coffee.save()
        .then(result => res.redirect('/coffee'))
        .catch(err => console.log(err))
}

const get_detail = (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
        .then(result => res.render('recipe/detail', {title: "Detail", coffee: result}))
        .catch(err => console.log(err))
}

const delete_coffee = (req, res) => {
    const id = req.params.id
    Recipe.findByIdAndDelete(id)
        .then(result => res.redirect('/coffee'))
        .catch(err => console.log(err))
}

module.exports = {
    get_coffee,
    get_create,
    post_coffee,
    get_detail,
    delete_coffee,
}