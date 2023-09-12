import React, { useEffect } from 'react'

import ChatMessage from './ChatMessage'
import MessageInput from './ChatInput'

import './Chat.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  isConnected: Boolean,
  sendMessage: (msg:string) => void,
}

const Chat: React.FC<IProps> = ({ isConnected, sendMessage}) => {  

  return (
    <div className='Chat'>
      {
      !isConnected ? 
        <span>Loading...</span> : 
        <>
          <span className='Chat-title'>
            <ToastContainer
              autoClose={1000}
              position='top-center'
              closeButton={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={false}
              closeOnClick={false}
              newestOnTop={true}
              draggable={false}
              limit={1}
            />
          </span>

          <div className='Chat__mess-continer'>
            <ChatMessage />

            <MessageInput sendMessageUser={sendMessage}/>
          </div>
        </>  
      }
    </div>
  )
}

export default Chat