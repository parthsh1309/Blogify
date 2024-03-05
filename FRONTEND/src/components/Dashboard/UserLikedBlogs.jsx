import React from 'react'
import AsideNav from './AsideNav'

function UserLikedBlogs() {
  return (
    <div className='sm:flex space-y-5'>
        <AsideNav/>

        <div className='sm:w-3/4'>
        <h1 className="sm:text-3xl text-xl text-white font-mont uppercase py-4 text-center w-full">Liked Blogs</h1> 
        <div className='w-full flex justify-center items-center sm:h-4/5'>
          <p className='text-center text-white text-5xl'>
            No Blogs Found
          </p>
        </div>
        </div>
    </div>
  )
}

export default UserLikedBlogs