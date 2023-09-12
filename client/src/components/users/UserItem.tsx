import React, { useEffect, useState} from 'react'

import authSelectors from '../../reduxToolkit/selectors/selectorsUser'

import type { ISocketMembers, ISocketOwner } from '../types/Socket'
import { FaBeer } from 'react-icons/fa';

import { RoomContext, useMyContext } from '../../context/myContext'

import './Users.css'
interface IProps {
  user: ISocketMembers,
}

const UserList: React.FunctionComponent<IProps> = ({user}) => {
  const currentRoom = useMyContext(RoomContext)
  const currentUsername = authSelectors.useGetCurrentUserId()

  const [owner, setOwner] = useState<ISocketOwner | []>([])

  useEffect(() => {
    if (currentRoom) {
      setOwner(currentRoom.owner)
    }
  }, [currentRoom])

  return (
    <>
      <li className={`User__item ${currentUsername === user.id && 'User__item--owner'}`}>
        <img src={`https://api.multiavatar.com/${user.name}.svg`} className='User__avatar' alt={user.name}/>

        <span className='User__name'>{user.name}</span>
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