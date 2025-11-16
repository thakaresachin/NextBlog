import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LatestBlogs from '../components/LatestBlogs'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestBlogs/>
    </div>
  )
}

export default Home