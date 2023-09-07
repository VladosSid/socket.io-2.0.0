import React, {useEffect, useState} from 'react'

import './Rooms.css'

import { getAllRooms } from '../../api/roomsApi'

import ListRooms from './ListRooms'

import type { IListRooms } from '../types/Rooms'

const Rooms:React.FC = () => {
  const [roomsList, setRoomsList] = useState<IListRooms[] | []>([])
  const [mode, setMode] = useState<string>('Choose')

  useEffect(() => {
    const data = getAllRooms();
    data
      .then(res => {
        setRoomsList(res)
      })
      .catch(err => {
        console.log(err.message);
      })

    }, [])

  const modeActive = mode === 'Create'
  return (
    <div className='Rooms'>
      <h3>Pleas choose or create room</h3>

      <div className='Rooms__continer'>
        <div className='Rooms__continer-button'>
          <button 
            onClick={() => setMode('Create')} 
            className={modeActive ? 'Header_button Rooms__button Rooms__is-active' : 'Header_button Rooms__button'}>Create</button>
          <button 
            onClick={() => setMode('Choose')} 
            className={!modeActive ? 'Header_button Rooms__button Rooms__is-active' : 'Header_button Rooms__button'}>Choose</button>
        </div>

        {!modeActive ? <ListRooms rooms={roomsList}/> : null}
      </div>

      
    </div>
  )
}

export default Rooms