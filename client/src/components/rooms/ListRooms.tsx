import React from 'react'
import { Link } from 'react-router-dom'

import type { IListRooms } from '../types/Rooms'

interface IProps {
  rooms: IListRooms[]
}

const ListRooms: React.FC<IProps> = ({rooms}) => {
  
  return (
    <ul className='Rooms__list'>
      {rooms.map(room => {
        return (
          <li key={room.id} className='Rooms__list-item'>
            <Link to={`/chat/${room.id}`} className='Rooms__list-link'>
              <span>
                {room.nameRoom}
              </span>
              <div className='Rooms__list-description'>
                <span style={{display: 'flex', gap: '5px'}}>
                  owner:
                  <span style={{color: "#f5c75a"}}>
                    {room.owner.name}
                  </span>
                </span>
                <span style={{display: 'flex', gap: '5px'}}>
                  online:
                  <span style={{color: "#f5c75a"}}>
                    {room.member}
                  </span>
                </span>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default ListRooms