import React from 'react'
// eslint-disable-next-line no-unused-vars
import styles from "./index.css"
import Header from './homePageComponents/Header'
// eslint-disable-next-line no-unused-vars
import banner from '../src/images/Image-Advisors-noted-that-cruises-of-all-types-are.webp'
import Booking from './homePageComponents/Booking'


function Home() {
  return (
    <div className='bg-[url(../src/images/Image-Advisors-noted-that-cruises-of-all-types-are.webp)] bg-cover bg-no-repeat'>
    <Header/>
    <section className='h-screen'>
      <Booking/>
    </section>
    </div>
    
  )
}

export default Home