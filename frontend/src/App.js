import React from 'react'
import Login from './Login' //Login import that has where clients are entering information
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}> </Route> {/*These route is the home pafe */}
        <Route path='/signup' element={<Signup />}> </Route> {/*this route allows the change to sign up page */} 
      </Routes>
    </BrowserRouter>
    
  )
}

export default App