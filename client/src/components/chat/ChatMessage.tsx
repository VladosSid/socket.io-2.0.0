import React, { useEffect, useState } from 'react'

import { RoomContext, useMyContext } from '../../context/myContext'
import authSelectors from '../../reduxToolkit/selectors/selectorsUser'

import { ISocketMessage } from '../types/Socket'

const ChatMessages:React.FC = () => {
  const chatList = useMyContext(RoomContext)
  const currentUsername = authSelectors.useGetCurrentUserName()

  const [messageList, setMessageList] = useState<ISocketMessage[] | []>([])

  useEffect(() => {
    if (chatList) {
      setMessageList(chatList.messages)
    }
  }, [chatList])
  
  return (
    <>
      { 
        messageList.map(msg => {
          return (
            <li key={msg.id.toString()} className='Chat-messages__container-item'>
              <span 
                className={`Chat-messages__user-name ${msg.owner === currentUsername ? 'Chat-messages__user-name--owner' : ''}`}>
                  {msg.owner === currentUsername ? 'You' : msg.owner}
              </span>

              <span 
                className={`Chat-messages__text ${msg.owner === currentUsername ? 'Chat-messages__text--owner' : ''}`}>
                  {msg.message}
              </span>
            </li>
          )
        })
      }
    </>
  )
}

export default ChatMessages