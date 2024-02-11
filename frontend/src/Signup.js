import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'

 
function Signup() {
 
    const [username, setUserName] = useState("") 
    const [password, setPassword] = useState("") 
    const [email, setEmail] = useState("") 

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

      const handleSubmit = (event) => {
        // console.log(values)
        event.preventDefault();
        setErrors(Validation(username, email,password));
        // console.log(values);
        if (errors.username === "" && errors.email === "" && errors.password === "") {
             axios.post('http://localhost:8081/signup', {username: username, email: email, password: password})
            .then((data) => {
                navigate('/');
                console.log(data);
            })
            .catch(err => console.log(err))
        }}
    
    return  (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2><strong>Sign-Up</strong></h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='username'><strong>Username</strong></label>
                    <input type='text' placeholder='Create Username' value={username}
                    onChange={(e) => setUserName(e.target.value)} className='form-control rounded-0' name='username'/>
                    {errors.username && <span className="text-danger" >{errors.username}</span>} 
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Create Password' value={password}
                    onChange={(e) => setPassword(e.target.value)} className='form-control rounded-0' name="password"/>
                    {errors.password && <span className="text-danger" >{errors.password}</span>} 
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email' value={email}
                    onChange={(e) => setEmail(e.target.value)} className='form-control rounded-0' name = "email"/>
                    {errors.email && <span className="text-danger" >{errors.email}</span>} 
                </div>
                <button type='submit' className='btn btn-success w-100'>Create Account</button>
                <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value="" id='flexCheckDefault'/>
                     <label className='form-check-label' htmlFor="flexCheckDefault">
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