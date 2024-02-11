import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from"./LoginValidation"
import axios from 'axios'

function Login() {
  
    const [email, setEmail] = useState("") 
    const [password, setPassword] = useState("")  

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})



        const handleSubmit = (event) => {
            event.preventDefault();
            setErrors(Validation(email,password));
            if(errors.email === "" && errors.password === ""){
                axios.post('http://localhost:8081/login', {email: email, password: password})
                .then((data) => {
                    
                    navigate('/home');
                    
                    console.log(data);
                })
                .catch(err => console.log(err))
            }}
    

    return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'> {/*bootstrap class to clean up layout of the login section*/}
        <div className='bg-white p-3 rounded w-25'>
            <h2><strong>Sign in</strong></h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email or Username' value={email}
                    onChange={(e) => setEmail(e.target.value)} className='form-control rounded-0' name='email'/>  
                    {errors.email && <span className="text-danger" >{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' value={password}
                    onChange={(e) =>setPassword(e.target.value)} className='form-control rounded-0' name='password'/> 
                    {errors.password && <span className="text-danger" >{errors.password}</span>}

                </div>
                <button className='btn btn-success w-100'>Login</button>
                <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value="" id='flexCheckDefault'/>
                    <label className='form-check-label' for="flexCheckDefault">
                    Stay Signed In
                    </label>
                </div>
                
                <Link to="/signup" className='btn btn-info border w-100 rounded-0 text-decoration-none'>Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login