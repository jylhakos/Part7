import axios from 'axios'

const baseUrl = '/api/users'

// // $ curl -X "POST" http://localhost:3003/api/users -H "Content-Type: application/json" -d "{\"username\":\"vruuska\", \"name\":\"Venla Ruuska\", \"password\":\"secret\"}"

// $ curl -X "GET" http://localhost:3003/api/users

// 7.13
const getUsers = async () => {

  const response = await axios.get(baseUrl)

  console.log('getUsers', response.data)
  
  return response.data
}

export default { getUsers }