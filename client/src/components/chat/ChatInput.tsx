import React, { FormEvent, useState } from 'react'

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

    return (
        <>
            <form onSubmit={e => sendMessage(e)} className='Chat-input__form'>
                <div style={{width: "100%"}}>
                    <input value={message} autoFocus={true} onChange={e => setMessage(e.target.value)} className='Chat-input__form-input'></input>
                </div>
                <button type='submit' className='Chat-input__button'>Send</button>
            </form>
        </>
    )
    
}

export default MessageInput
