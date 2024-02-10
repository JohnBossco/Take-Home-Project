function Validation (values){

    let error = {} //an object that we will store errors in 

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //Regex code designed to match a valid email address format checks if string adheres to a pattern  

    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ //Also Regex that needs to match one digit one lowercase letter one uppercase letter and at least 8 characters long

    if(values.username === ""){
        error.username = "Username Should not be empty"
    } //if username is blank this error message will appear
        else{
        error.username = ""
    }

    if(values.password === ""){
        error.password = "Password Should not be empty"
    } //if password is blank this error message will appear
    else if(!passwordPattern.test(values.password)){
        error.password = "Password didn't match"
    }//if password wrong this error message will appear
    else{
        error.password = ""
    }

    if(values.email === ""){
        error.email = "Email Should not be empty"
    } //if email is blank this error message will appear
    else if(!emailPattern.test(values.email)){
        error.email = "Email didn't match"
    }//if email is not empty but incorrect this error message will appear
    else{
        error.email = ""
    }





    return error;
}

export default Validation