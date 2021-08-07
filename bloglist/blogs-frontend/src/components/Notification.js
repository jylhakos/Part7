import React from 'react'

import { connect } from 'react-redux'

// 7.9
const Notification = ({notification=null}) => {

  console.log('Notification', notification)

  if (notification === null) {
    return (<div style={{display: 'none'}}></div>)
  }

  const style = {
    color: 'green',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default connect(
  (state) => ({ notification: state.notification })
)(Notification)
