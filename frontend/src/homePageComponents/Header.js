import React from 'react'
import { GiShipBow } from "react-icons/gi";


function Header() {
  return (
    <header className='w-full p-4 bg-slate-50'>
        <nav className='flex items-center justify-between max-w-6xl mx-auto'>
            <h1 className=' text-indigo-600 text-lg font-bold flex it underline'><GiShipBow className='text-2xl mr-1 text-indigo-600'/>Ship Keep Co</h1>
            <button className='bg-indigo-600 text-white px-6 py-2 rounded font-medium'><a href='/' className='m-auto no-underline  text-white'>Sign Out</a></button>
        </nav>
    </header>
  )
}

export default Header