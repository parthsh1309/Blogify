import React from 'react'
import { useParams } from 'react-router-dom'

function Blog() {
    const {blogId} = useParams()
  return (
    <div>
      <h1>Blog = {blogId}</h1>
    </div>
  )
}

export default Blog