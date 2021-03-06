import axios from 'axios'

const baseUrl = '/api/blogs'

// 5.1
let token = null

const setToken = newToken => {

  token = `bearer ${newToken}`

  console.log(token)
}

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${token}` }
  }
}

const getAll = () => {

  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

// 7.10
const create = async object => {

  const newObject = {
    title: object.title,
    author: object.author,
    url: object.url,
    likes: 0 
  }

  console.log('newObject', newObject)

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

// 7.11
const update = async (object) => {

  const config = {
    headers: { Authorization: token },
  }

  console.log('update', object.id)

  const response = await axios.put(`${baseUrl}/${object.id}`, object, config)

  console.log('response.data', response.data)

  return response.data
}

const remove = async (object) => {

  console.log('remove', object.id)

  const response = await axios.delete(`${baseUrl}/${object.id}`, getConfig())

  return response.data
}

export default { getAll, setToken, create, update, remove }
