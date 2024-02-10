import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Validation from './SignupValidation'

 
function Signup() {
 
    const [values, setValues] = useState({ 
        username: "",
        email: "",   
        password: ""
    })  /* set object values for both email and password that can later be updated */

    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.username]: [event.target.value]})) //handles input changes then updates  the state using setValues
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }
  
 
    return  (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2><strong>Sign-Up</strong></h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Username</strong></label>
                    <input type='email' placeholder='Create Username' 
                    onChange={handleInput} className='form-control rounded-0' name='username'/>
                    {errors.username && <span className="text-danger" >{errors.username}</span>} 
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Create Password' 
                    onChange={handleInput} className='form-control rounded-0' name="password"/>
                    {errors.password && <span className="text-danger" >{errors.password}</span>} 
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Email</strong></label>
                    <input type='password' placeholder='Enter Email' 
                    onChange={handleInput} className='form-control rounded-0' name = "email"/>
                    {errors.email && <span className="text-danger" >{errors.email}</span>} 
                </div>
                <button type='submit' className='btn btn-success w-100'>Create Account</button>
                <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value="" id='flexCheckDefault'/>
                    <label className='form-check-label' for="flexCheckDefault">
                    I have read and agree to the Terms of Use and Privacy Policy.
                    </label>
                </div>
                
                <Link to="/" className='btn border w-100 rounded-0 text-decoration-none'>Sign in</Link>
            </form>
        </div>
    </div>
  )
}
 
export default Signup