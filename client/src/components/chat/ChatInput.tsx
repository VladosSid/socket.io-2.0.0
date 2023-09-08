import React, { ChangeEvent, FormEvent, useState } from 'react'

interface props {
  sendMessageUser: (msg:string) => void
}

const MessageInput: React.FC<props> = ({sendMessageUser}) => {
  const [message, setMessage] = useState<string>('')

  const sendMessage = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    sendMessageUser(message)
    setMessage('')
  }

  const changeMessage = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    // const textareaLineHeight = 30;
    // const minRows = 1;
    // const maxRows = 5;

    // const previousRows = e.target.rows;
    // e.target.rows = minRows;

    // const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    // if (currentRows === previousRows) {
    //   e.target.rows = currentRows;
    // }

    // if (currentRows >= maxRows) {
    //   e.target.rows = maxRows;
    //   e.target.scrollTop = e.target.scrollHeight;
    // }
  }

  return (
    <>
      <form onSubmit={e => sendMessage(e)} className='Chat-input__form'>
        <div style={{width: "100%", position: 'relative'}}>
          <textarea value={message} autoFocus={true} onChange={e => changeMessage(e)} className='Chat-input__form-input'></textarea>
          
          <button type='submit' className='Chat-input__button'>Send</button>
        </div>

      </form>
    </>
  )
}

export default MessageInput
