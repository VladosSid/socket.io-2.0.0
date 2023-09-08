import React from 'react'

import authSelectors from '../../reduxToolkit/selectors/selectorsUser'

import ChatMessage from './ChatMessage'
import MessageInput from './ChatInput'

import './Chat.css'

interface IProps {
  isConnected: Boolean,
  sendMessage: (msg:string) => void
}

const Chat: React.FC<IProps> = ({ isConnected, sendMessage}) => {  
  const currentUsername = authSelectors.useGetCurrentUserName()

  return (
    <div className='Chat'>
      {
      !isConnected ? 
        <span>Loading...</span> : 
        <>
          <span className='Chat-title'>
            Wecom in chat, <span>{currentUsername}</span>
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