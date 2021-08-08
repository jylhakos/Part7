import React from 'react'

const padding = {
    paddingLeft: 25
}

const User = ({ user }) => {

  return ( user != null ? ( <tr><td>{user.name}</td> <td style={padding}>{user.blogs.length}</td></tr> ) : null )

}

export default User