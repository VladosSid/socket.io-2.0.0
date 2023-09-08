import React, { useEffect, useState, useRef, RefObject } from 'react'

import authSelectors from '../../reduxToolkit/selectors/selectorsUser'
import { MessageContext, useMyContext } from '../../context/myContext'

import { ISocketMessage } from '../types/Socket'

import { TransitionGroup, CSSTransition } from 'react-transition-group'


const ChatMessages:React.FC = () => {
  const messages = useMyContext(MessageContext)
  const scrollMessage = useRef(null) as RefObject<HTMLDivElement> | null
  const currentUsername = authSelectors.useGetCurrentUserName()

  const [messageList, setMessageList] = useState<ISocketMessage[] | []>([])

  useEffect(() => {
    if (messages) {
      setMessageList(messages)
    }
  }, [messages])

  useEffect(() => {
    if (scrollMessage && scrollMessage.current) {
      scrollMessage.current.scrollTop = scrollMessage.current.scrollHeight
    }
  }, [messageList.length])
  
  return (
    <div className='Chat__mess-continer--scroll' ref={scrollMessage}>
      <TransitionGroup component='ul' className='Chat-messages'>
        { 
          messageList.map(msg => {
            return (
              <CSSTransition
                key={msg.id.toString()}
                timeout={250}
                classNames={msg.owner === currentUsername ? 'item-owner' : 'item'}
              >
                <li className='Chat-messages__container-item'>
                  <span 
                    className={`Chat-messages__user-name ${msg.owner === currentUsername ? 'Chat-messages__user-name--owner' : ''}`}>
                      {msg.owner === currentUsername ? 'You' : msg.owner}
                  </span>

                  <span 
                    className={`Chat-messages__text ${msg.owner === currentUsername ? 'Chat-messages__text--owner' : ''}`}>
                      {msg.message}
                  </span>
                </li>
              </CSSTransition>
            )
          })
        }
      </TransitionGroup>
    </div>

  )
}

export default ChatMessages