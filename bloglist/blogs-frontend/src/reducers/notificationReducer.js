import Notification from './../components/Notification'

const notificationReducer = (state = null, action) => {

  switch (action.type) {
    case 'NOTIFICATION':
      console.log('NOTIFICATION', action.content)
      return action.content
    case 'CLEAR':
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
      type: 'NOTIFICATION',
      content
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export const clearNotification = (id) => (
  { type: 'CLEAR' }
)

export default notificationReducer
