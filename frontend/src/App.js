import React from 'react'
import Login from './Login' //Login import that has where clients are entering information
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}> </Route>
        <Route path='/signup' element={<Signup />}> </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App