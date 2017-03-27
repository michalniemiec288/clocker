import React from 'react'
import {Button} from 'react-bootstrap'

const UsersList = ({users, uids}) =>
  <div>
    {users && uids.map((uid, i) =>
      <Button style={{margin: 10}} bsStyle="info" key={i}>
        {users[uid].displayName || users[uid].email}
      </Button>
    )}
  </div>

export default UsersList