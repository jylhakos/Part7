import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT':
      console.log('action.data', action.data)
      return action.data
    case 'CREATE':
      console.log('action.data', action.data)
      return [...state, action.data]
    case 'LIKE':
      console.log('action.data', action.data)
      const likes = action.data
      return state.map(like => like.id === likes.id ? likes : like)
    case 'DELETE':
      console.log('action.data', action.data.id)
      return state.filter(blog => blog.id !== action.data.id)
    default: 
      return state
  }
}

// 7.9
export const initializeBlogs = () => {

  console.log('initializeBlogs')

  return async dispatch => {

    const data = await blogService.getAll()

    console.log('initializeBlogs', data)

    dispatch({
      type: 'INIT',
      data
    })
  }
}

// 7.10
export const createBlog = (content) => {

  console.log('createBlog', content)

  return async dispatch => {

    const data = await blogService.create(content)

    console.log('data', data)

    dispatch({
      type: 'CREATE',
      data
    })
  }
}

// 7.11
export const likeBlog = (blog) => {

  console.log('likeBlog', blog)

  return async dispatch => {

    console.log('dispatch', blog)

    console.log('blog.likes', blog.likes)

    const likes = {...blog, likes: blog.likes + 1 }

    console.log('dispatch', likes)

    const data = await blogService.update(likes)

    console.log('data', data)

    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const removeBlog = (blog) => {

  console.log('removeBlog', blog)

  return async dispatch => {

    console.log('dispatch', blog)

    const data = await blogService.remove(blog)

    console.log('data', data)

    dispatch({
      type: 'DELETE',
      data
    })
  }
}

export default blogsReducer