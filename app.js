if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override')
const PORT = process.env.PORT;
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const {checkUser} = require('./middleware/authMiddleware')

// middleware

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))

// view engine
app.set('view engine', 'ejs');

//database connection & listen to port

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT, () => console.log('Connected to Database\nServer is running on port '+ PORT)))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('index', {title: 'Home'}));
app.use(require('./routes/recipeRoutes'))
app.use(require('./routes/reviewRoutes'))
app.use(authRoutes)

app.get('/home', (req, res) => res.redirect('/'))
app.get('/about', (req, res) => res.render('about', {title: 'About'}))
app.use((req, res) => res.status(404).render('404', {title: "404"}))