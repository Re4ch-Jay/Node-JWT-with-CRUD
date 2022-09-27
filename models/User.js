const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {isEmail, isAlphanumeric} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        require: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate:[isEmail, 'Please enter a valid email']
    },
    username: {
        type: String,
        require: [true, 'Please enter a name'],
        unique: true,
        validate:[isAlphanumeric, 'Usernames may only have letters and numbers']
    },
    password: {
        type: String,
        require: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
}, {timestamps: true})


// fire this function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}



const User = mongoose.model('user', userSchema)

module.exports = User;