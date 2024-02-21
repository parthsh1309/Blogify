import React from 'react'
import HomeNav from './nav/HomeNav'
import Blog from './Blog'

function Home() {
  return (
   <div className='px-4 text-white'>
   <HomeNav/>
   <Blog/>
   </div>
  )
}

export default Home