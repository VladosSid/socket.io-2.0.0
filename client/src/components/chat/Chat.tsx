import React from 'react'

import './Chat.css'

import authSelectors from '../../reduxToolkit/selectors/selectorsUser'

import ChatMessage from './ChatMessage'
import MessageInput from './ChatInput'

interface IProps {
  isConnected: Boolean,
  // messageList: ISocketMessage[],
}

const Chat: React.FC<IProps> = ({ isConnected }) => {  
  const currentUsername = authSelectors.useGetCurrentUserName()

  const sendMessageUser = (msg: string) => {
    // if (socket) {
    //   socket.emit("message", msg);
    // }
  }
  
  return (
      <div className='Chat'>
          {
          !isConnected ? 
            <span>Loading...</span> : 
            <>
              <span className='Chat-title'>
                  Wecom in chat, <span>{currentUsername}</span>
              </span>
              <div>
                <ul className='Chat-messages'>
                    <ChatMessage />
                </ul>
                <MessageInput sendMessageUser={sendMessageUser}/>
              </div>
            </>  
          }
      </div>
  )
}

export default Chat