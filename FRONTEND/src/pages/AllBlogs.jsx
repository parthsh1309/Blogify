import React from 'react'
import { Blogs, Filter } from '../components'

function AllBlogs() {
  const [filterVisible, setFilterVisible] = React.useState(false)
  return (
    <div className='relative flex'>
      <Filter filterVisible={filterVisible} setFilterVisible={setFilterVisible}/>
      <Blogs filterVisible={filterVisible} setFilterVisible={setFilterVisible}/>
    </div>
  )
}

export default AllBlogs