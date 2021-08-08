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

// 7.13
// $ npm install react-router-dom

import {
  BrowserRouter as Router,
  Switch, 
  Route, 
  Link
} from 'react-router-dom'

// 7.13
import userService from './services/users'

import UsersList from './components/UsersList'

// 7.9 
import { setNotification } from './reducers/notificationReducer'

import Notification from './components/Notification'

import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogsReducer'

import { login, logout } from './reducers/userReducer'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

const Blogs = ({user,loginForm,handleLogout,blogForm,blogs,like,remove}) => (
  <div>
       {
        user === null ? loginForm() :
        <div>
        <h2>blogs</h2>
          <Notification />
          <div>
            <p>
              {user.user.name} logged in
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

  // USER
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  // 7.12
  //const [user, setUser] = useState(null)

  // 7.13
  const [users, setUsers] = useState(null)

  // 7.12
  const user = useSelector(state => {
    console.log('useSelector', state.user)
    return state.user
  })

  // 7.10
  useEffect(() => {

    console.log('useEffect', user)

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

      const logged = JSON.parse(loggedUserJSON)

      console.log('logged', logged)

      //setUser(logged)

      dispatch(login(logged))

      blogService.setToken(logged.token)

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

      dispatch(logout(user))

      //setUser({})

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

      const logged = await loginService.login({username, password})

      console.log('Login: ', username, password)

      blogService.setToken(logged.token)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(logged)) 

      dispatch(login(logged))

      //setUser(login)

      console.log('user', logged)

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

    dispatch(setNotification(`you liked '${likes.title}'`, 5))
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

  useEffect(() => {
  }, [])

  useEffect(() => {

    async function fetch() {

      const response = await userService.getUsers()

      console.log('fetch',response)

      if (response !== null) {

        setUsers(response)
      }
    }

    fetch()
  }, [user])

  const blogForm = () => (

    // 5.11
    <Togglable buttonLabel='Create New Blogs'>
      <BlogForm newBlog={addBlog} />
    </Togglable>
  )

  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/users">
          <UsersList users={users}/>
        </Route>
        <Route path="/">
          <Blogs user={user} loginForm={loginForm} handleLogout={handleLogout} blogForm={blogForm} blogs={blogs} like={like} remove={remove}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default connect(
  null,
  { setNotification,
    initializeBlogs,
    createBlog,
    likeBlog,
    removeBlog,
    login,
    logout
  }
)(App)