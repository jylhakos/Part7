// 7.12
const userReducer = (state = null, action) => {

  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN', action.data)
      return {...state, user: action.data}
    case 'LOGOUT':
      console.log('LOGOUT', action.data)
      return {...state, user: null}
    default: 
      return state
  }
}

export function login(data) {

    console.log('login', data)

    return {
        type: 'LOGIN',
        data
    }
}

export function logout(data) {

    console.log('logout', data)

    return {
        type: 'LOGOUT',
        data
    }
}

export default userReducer
