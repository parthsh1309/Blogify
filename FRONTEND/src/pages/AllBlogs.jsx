import React from 'react'
import { Blogs, Filter } from '../components'

function AllBlogs() {
  return (
    <div className='relative flex'>
      <Filter />
      <Blogs/>
    </div>
  )
}

export default AllBlogs