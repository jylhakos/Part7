import Notification from './../components/Notification'

const notificationReducer = (state = null, action) => {

  switch (action.type) {
    case 'SET_MSG':
      console.log('SET_MSG', action.content)
      return action.content
    case 'CLEAR_MSG':
      return null
    default: 
      return state
  }
}

let timeoutId 

export const setNotification = (content, time) => {

  return async dispatch => {

    console.log('setNotification', content)

    dispatch({
      type: 'SET_MSG',
      content
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MSG'
      })
    }, time * 1000)
  }
}

export const clearNotification = (id) => (
  { type: 'CLEAR_MSG' }
)

export default notificationReducer
