// $ npm install

// $ npm install prop-types

// $ npm install react-redux

// $ npm start

// 7.9
import { useSelector, useDispatch } from 'react-redux'

import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

// 5.11
import PropTypes from 'prop-types'

import './index.css'

import Blog from './components/Blog'

import BlogForm from './components/BlogForm'

import Togglable from './components/Togglable'

// 7.9
import blogService from './services/blogs'

import loginService from './services/login'

// 7.9 
import { setNotification } from './reducers/notificationReducer'

import Notification from './components/Notification'

import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogsReducer'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

const App = (props) => {

  // 7.9
  const dispatch = useDispatch()

  // 7.9
  const blogs = useSelector(state => {
    console.log('useSelector', state.blogs)
    return state.blogs
  })

  // BLOGS
  // const [blogs, setBlogs] = useState([])

  // USERS
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // 7.10
  useEffect(() => {

    if (user !== null && Object.keys(user).length != 0) {
      dispatch(initializeBlogs())
    }

  }, [dispatch, user])

  // 5.6
  const addBlog = async (blogObject) => {

    console.log('blogObject', blogObject)

    await props.createBlog(blogObject)

    // 7.10
    props.setNotification(`The blog ${blogObject.title} is created by ${user.name}`,5)
  }

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {

      const user = JSON.parse(loggedUserJSON)

      console.log('loggedUser', user)

      setUser(user)

      blogService.setToken(user.token)

    }

  }, [])

  //const handleBlogChange = (event) => {

  //  console.log(event.target.value)

  //  setNewBlog(event.target.value)
  //}

  // 5.2
  const handleLogout = async (event) => {

    console.log('handleLogout')

    event.preventDefault()

    try {

      setUser({})

      setUsername('')

      setPassword('')

      // window.localStorage.removeItem('loggedBlogUser')

      window.localStorage.clear()

      window.location.href = '/'

      //history.push('/api/login')

      //this.props.history.push('/api/login');

    } catch (exception) {

      console.log('ERROR', exception)

    }
  }

  // 5.1
  const handleLogin = async (event) => {

    console.log('handleLogin')

    event.preventDefault()

    try {

      const user = await loginService.login({username, password})

      console.log('Login: ', username, password)

      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user)) 

      setUser(user)

      console.log('user', user)

      setUsername('')

      setPassword('')

    } catch (exception) {

      console.log('ERROR', exception)

      setUsername('')

      setPassword('')

      props.setNotification('A wrong username or password',5)

    }
  }

  const loginForm = () => (
    <div>
    <h2>Login</h2>
    <Notification />
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
            onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  )

  const like = (object) => {

    const id = object.id

    console.log('like', id)

    const likes = blogs.find(blog => blog.id === id)

    console.log('likes', likes)

    dispatch(likeBlog(likes))

    dispatch(setNotification(`you voted '${likes.title}'`, 5))
  }

  const remove = (object) => {

    const id = object.id

    console.log('remove', id)

    const archive = blogs.find(blog => blog.id === id)

    if (window.confirm(`Delete '${archive.title}' ?`)) {

      dispatch(removeBlog(archive))

      dispatch(setNotification(`you deleted '${archive.title}'`, 5))
    }
  }

  const blogForm = () => (

    // 5.11
    <Togglable buttonLabel='Create New Blogs'>
      <BlogForm newBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
       {
        user === null ? loginForm() :
        <div>
        <h2>blogs</h2>
          <Notification />
          <div>
            <p>
              {user.name} logged in
              { 
                localStorage.getItem('loggedBlogUser') !== null ? <button style={{margin:'25px'}} onClick={ event => { if(localStorage.getItem('loggedBlogUser') !== null) handleLogout(event) } }> logout</button> : null
              }
              { 
                blogForm()
              }
            </p>
          </div>
          <div>
          { blogs.map(blog => <Blog key={blog.id} blog={blog} like={like} remove={remove} id={blog.id}></Blog>  
          )}
          </div>
        </div>
       }
    </div>
  )
}

export default connect(
  null,
  { setNotification,
    initializeBlogs,
    createBlog,
    likeBlog,
    removeBlog
  }
)(App)