function Validation (username,email,password) {

    let error = {} //an object that we will store errors in 

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //Regex code designed to match a valid email address format checks if string adheres to a pattern  

    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/ //Also Regex that needs to match one digit one lowercase letter one uppercase letter and at least 8 characters long

//USERNAME
    if(username === ""){
        error.username = "Username should not be empty"
    } //if username is blank this error message will appear
        else{
        error.username = ""
    }

//PASSWORD
    if(password === ""){
        error.password = "Password should not be empty"
    } //if password is blank this error message will appear
    else if(!passwordPattern.test(password)){
        error.password = "Password didn't match"
    }//if password wrong this error message will appear
    else{
        error.password = ""
    }

//EMAIL    
    if(email === ""){
        error.email = "Email Should not be empty"
    } //if email is blank this error message will appear
    else if(!emailPattern.test(email)){
        error.email = "Email didn't match"
    }//if email is not empty but incorrect this error message will appear
    else{
        error.email = ""
    }

    return error;
}

export default Validation