import React from 'react'

const Blog = ({blog,like,id}) => (
  <div className="blog">
    {blog.title} {blog.author} has {blog.likes} likes
    <button onClick={() => like({id})}>like</button>
  </div>                     
)

export default Blog