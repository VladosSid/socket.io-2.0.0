import { useEffect, useState } from 'react';

import './Users.css'

import { useMyContext, RoomContext } from '../../context/myContext'

// import type { IUser } from '../types/users'
import { ISocketMembers } from '../types/Socket'

import UserItem from './UserItem'

function Users() {
  const currentRoom = useMyContext(RoomContext)

  const [members, setMembers] = useState<ISocketMembers[] | []>([])

  useEffect(() => {
    if (currentRoom) {
      setMembers(currentRoom.member)
    }
  }, [currentRoom])

  return (
      <div className='Users'>
          <div className="Users-count">
              Users Online: {members.length}
          </div>
          <ul className="Users-list">
              {members.map(user => <UserItem key={`${user.id}`} user={user}/>)}
          </ul>
      </div>
  )
}

export default Users