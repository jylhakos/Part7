import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT':
      console.log('action.data', action.data)
      return action.data
    case 'CREATE': 
      return [...state, action.data]
    default: 
      return state
  }
}

// 7.10
export const createBlog = (content) => {

  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

// 7.9
export const initializeBlogs = () => {

  console.log('initializeBlogs')

  return async dispatch => {

    const data = await blogService.getAll()

    console.log('blogs', data)

    dispatch({
      type: 'INIT',
      data
    })
  }
}

export default blogsReducer