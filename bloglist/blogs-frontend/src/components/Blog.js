import React from 'react'

const Blog = ({blog,like,remove,id}) => (
  <div className="blog">
    {blog.title} {blog.author} has {blog.likes} likes
    <button style={{margin:'5px', width: '50px'}} onClick={() => like({id})}>like</button>
    <button style={{margin:'5px', width: '50px'}} onClick={() => remove({id})}>delete</button>
  </div>                     
)

export default Blog