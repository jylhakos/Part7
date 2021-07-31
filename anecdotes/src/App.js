import React, { useState, useEffect } from 'react'

import ReactDOM from 'react-dom'

import './index.css';

// 7.4
import  { useField } from './hooks'

// 7.1 
// $ npm install react-router-dom

import {
  BrowserRouter as Router,
  Switch, 
  Route, 
  Link, 
  useParams,
  useHistory,
} from "react-router-dom"

const Notification = ({notification}) => {
  if (notification === null) {
    return null
  }

  return (
    <div className="notification">
      {notification}
    </div>
  )
}

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

// 7.2
const Anecdote = ({ anecdotes }) => {

  const id = useParams().id

  console.log('anecdotes', anecdotes)

  const anecdote = anecdotes.find(a => a.id === id)

  console.log('anecdote', anecdote)

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div style={{ paddingTop: '5px' }}>has {anecdote.votes} votes</div>
      <div style={{ paddingTop: '5px' }}>for more info see {anecdote.info}</div>
    </div>
  )
}

// 7.1
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div style={{ paddingTop: '25px' }}>

    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  
  </div>
)


// 7.4
const CreateNew = (props) => {

  //const content = useField('text')

  //const author = useField('text')

  //const info = useField('text')

  const { value:valueContent, bind:bindContent, reset:resetContent } = useField('')

  const { value:valueAuthor, bind:bindAuthor, reset:resetAuthor } = useField('')

  const { value:valueInfo, bind:bindInfo, reset:resetInfo } = useField('')

  const history = useHistory()

  // 7.5
  const handleReset = (event) => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    //console.log('handleSubmit', event.target.type, content.value, author.value, info.value)

    console.log('handleSubmit', event.target.type, valueContent, valueAuthor, valueInfo)

    props.addNew({
      content: valueContent,
      author: valueAuthor,
      info: valueInfo,
      votes: 0
    })

    history.push('/anecdotes')
  }

  // 7.6
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type="text" {...bindContent} />
        </div>
        <div>
          author
          <input type="text" {...bindAuthor} />
        </div>
        <div>
          url for more info
          <input type="text" {...bindInfo} />
        </div>
        <button type="submit">create</button><button type="reset" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

// 7.3
/* const CreateNew = (props) => {

  const [content, setContent] = useState('')

  const [author, setAuthor] = useState('')

  const [info, setInfo] = useState('')
  
  const [vote, setvote] = useState('')

  const history = useHistory()

  const handleSubmit = (e) => {

    e.preventDefault()

    props.addNew({
      content,
      author,
      info,
      votes: 0
    })

    history.push('/anecdotes')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' type='text' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' type='text' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' type='text' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}*/

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {

    anecdote.id = (Math.random() * 10000).toFixed(0)

    console.log('anecdote', anecdote)

    setAnecdotes(anecdotes.concat(anecdote))

    // 7.3
    setNotification(`A new anecdote ${anecdote.content} created`)

    setTimeout(() => {
      setNotification(null)
    }, 10000)

  }

  const anecdoteById = (id) => {

    anecdotes.find(a => a.id === id)

  }

  const vote = (id) => {

    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (

    <Router>

      <Menu />

      <Switch>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>

        <Route path="/anecdotes/:id">
          <Anecdote anecdotes ={anecdotes} />
        </Route>
     
        <Route path="/">
          <Notification notification={notification}/>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>

      </Switch>

      <div>
        <Footer />
      </div>

    </Router>
  )
}

export default App;