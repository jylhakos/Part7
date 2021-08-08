import React from 'react'

import User from './User'

// 7.13
const UsersList = ({users}) => {

  return(
  <div className="usersList">
  	<h2>Users</h2>
  	<table>
  		<thead style={{paddingLeft:'50px'}}>
  			<th></th><th><h3>blogs created</h3></th>
  		</thead>
  		<tbody>
  		{ users.map(user => <User user={user}/>)}
  		</tbody>
  	</table>
  </div>                     
)
}
export default UsersList
