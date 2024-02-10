import React from 'react'
import { Link } from 'react-router-dom'


function Login() {
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <form action=''>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email or Username' className='form-control rounded-0'/> {/*bootstrap class to clean up layout of the loging section*/} 
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' className='form-control rounded-0'/> 
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