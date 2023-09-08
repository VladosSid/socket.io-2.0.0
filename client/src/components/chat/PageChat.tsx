import React, { useState, useEffect  } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import { RoomContext, MessageContext } from '../../context/myContext'

import Chat from './Chat'
import Users from '../users/Users'
import authSelectors from '../../reduxToolkit/selectors/selectorsUser'

import type { ISocketConnected, ISocketDisconnected, ISocketRoom, ISocketMessage, ISocketNewMessage } from '../types/Socket'

const socket = io('http://localhost:5050/')

const PageChat:React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [room, setRoom] = useState<ISocketRoom | null>(null)
  const [messages, setMessages] = useState<ISocketMessage[]>([])
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false)
  
  const userId = authSelectors.useGetCurrentUserId()
  const roomId = location.pathname.split('/')[2];

  useEffect(() => {
    if (!userId || !roomId) return
    
    socket.emit('joinUser', {userId, roomId})

    socket.on('joinRoom', (data: ISocketConnected) => {
      setRoom(data.room)
      setMessages(data.room.messages)
      // console.log('JoinRoomRES', data);
    })
    
    socket.on('welcomMessage', (data: ISocketConnected) => {
      // console.log(data);
      setMessages(data.room.messages)
      setRoom(data.room)
      setIsConnected(true)
    })
    
    socket.on('leaveRoom', (data: ISocketDisconnected) => {
      setRoom(data.room)
    })

    
    socket.on('error', (data: String) => {
      console.log('error', data);
    })
    
    return () => {
      socket.emit('leaveRoom', {userId, roomId})
      setIsConnected(false)
    }
  }, [userId])
  
  socket.on('newMessage', (data: ISocketMessage) => {
    const mess: ISocketMessage[] = [...messages, data]
    setMessages(mess)
  })

  const sendMessage = (message: String) => {
    if (message.trim() === '') return
    // console.log(message);

    const dataSend = {
      message,
      roomId,
      userId,
    }
    socket.emit('messageRoom', dataSend)
  }
  
  // useEffect(() => {

  //   // socket.on('connected', (data: string) => {
  //   //   console.log(data);
  //   //   setSocket(socket)
  //   //   setIsConnected(true)
  //   // })

  //   return () => {
  //     // if (socket) {
  //       // socket.emit('disconnectUser',{userId, roomId});
  //       // setIsConnected(false)
  //     // }
  //   };
  // }, [])
  
  // useEffect(() => {
  //   if (socket) {
  //     socket.emit('connectedRoom', {userId, roomId})
  //   }
  // }, [socket])
  
  // if (socket) {
  //   // connetcted room and set data room
  //   socket.on('connectedRoom', (data: ISocketConnected) => {
  //     setRoom(data.room)
  //     console.log('connectedRoom', data);
  //     setIsConnected(true)
  //   })

  //   socket.on('disconnectRoom', (data:ISocketDisconnected) => {
  //     setRoom(null)
  //     setIsConnected(false)
  //     console.log('connectedRoom', data);
  //     navigate('/rooms')
  //   })

  //   // listner messages
  //   socket.on('message', (message: string) => {
  //     console.log('message', message);
  //   })
  
  //   // listner error
  //   socket.on('error', (message: string) => {
  //     console.log('error', message);
  //     setIsConnected(false)
  //   })
  // }

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