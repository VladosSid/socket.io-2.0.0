import React, { useEffect, useState} from 'react'

import type { ISocketMembers, ISocketOwner } from '../types/Socket'
import { FaBeer } from 'react-icons/fa';

import './Users.css'
import { RoomContext, useMyContext } from '../../context/myContext'

interface IProps {
  user: ISocketMembers,
}

const UserList: React.FunctionComponent<IProps> = ({user}) => {
  const currentRoom = useMyContext(RoomContext)

  const [owner, setOwner] = useState<ISocketOwner | []>([])

  useEffect(() => {
    if (currentRoom) {
      setOwner(currentRoom.owner)
    }
  }, [currentRoom])

  return (
    <>
      <li className='User-item'>
        <span>{user.name}</span>
        {/* {owner.id === user.id ? 
          <FaBeer /> :
          null
        } */}
        {/* <FaBeer /> */}
      </li>
    </>
  )
}

export default UserList