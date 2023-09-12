import React, { useState, useEffect  } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import { RoomContext, MessageContext } from '../../context/myContext'

import Chat from './Chat'
import Users from '../users/Users'
import authSelectors from '../../reduxToolkit/selectors/selectorsUser'
import { toast } from 'react-toastify';


import type { ISocketConnected, ISocketDisconnected, ISocketRoom, ISocketMessage } from '../types/Socket'
import { log } from 'console'

const socket = io('http://localhost:5050/')

const PageChat:React.FC = () => {
  const location = useLocation()
  const notifyJion = (mess: String) => toast.success(mess, {theme: "colored", icon: false});
  const notifyLeave= (mess: String) => toast.error(mess, {theme: "colored", icon: false});
  
  const [room, setRoom] = useState<ISocketRoom | null>(null)
  const [messages, setMessages] = useState<ISocketMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  
  const userId = authSelectors.useGetCurrentUserId()
  const roomId = location.pathname.split('/')[2];

  useEffect(() => {
    if (!userId || !roomId) return
    
    socket.emit('joinUser', {userId, roomId})
    
    socket.on('joinRoom', (data: ISocketConnected) => {
      console.count(data.message);

      notifyJion(data.message)
      setRoom(data.room)
    })
    
    socket.once('welcomMessage', (data: ISocketConnected) => {
      console.count(data.message);
      
      notifyJion(data.message)
      setMessages(data.room.messages)
      setRoom(data.room)
      setIsConnected(true)
    })
    
    socket.once('leaveRoom', (data: ISocketDisconnected) => {
      console.count(data.message);

      notifyLeave(data.message)
      setRoom(data.room)
    })

    
    socket.on('error', (data: String) => {
      console.log('error', data);
    })
    
    return () => {
      console.count('return leaveRoom');
      socket.emit('leaveRoom', {userId, roomId})
      setIsConnected(false)
      socket.removeAllListeners();
    }
  }, [userId])
  
  socket.on('newMessage', (data: ISocketMessage) => {
    const mess: ISocketMessage[] = [...messages, data]
    setMessages(mess)
  })

  const sendMessage = (message: String) => {
    if (message.trim() === '') return

    const dataSend = {
      message,
      roomId,
      userId,
    }
    socket.emit('messageRoom', dataSend)
  }

  return (
    <div className='Chat__container'>
      <RoomContext.Provider value={room}>
        <MessageContext.Provider value={messages}>
          <Users />
          <Chat isConnected={isConnected} sendMessage={sendMessage}/>
        </MessageContext.Provider>
      </RoomContext.Provider>
    </div>
  )
}

export default PageChat