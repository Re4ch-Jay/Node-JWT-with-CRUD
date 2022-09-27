const handleError = (err) => {
    console.log(err.message, err.code)
    let errors = {email: "", username: "", password: ""}

    // duplicate error code in signup form
    if(err.code === 11000){
        errors.email = "That email is already existed"
        errors.username = "That username is already existed"
    }

    // validation in signup form
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).map(error =>{
            errors[error.properties.path] = error.properties.message;
        })
    }


    // login errors
    if(err.message === "incorrect email"){
        errors.email = 'That email you are trying to login is not exist'
    }

    if(err.message === "incorrect password"){
        errors.password = "Incorrect password"
    }
    
    return errors;
}

module.exports = handleError;