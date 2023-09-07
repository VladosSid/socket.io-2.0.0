import React, { ChangeEvent, useState } from 'react'

import './Auth.css'

interface props {
  nameInput: string
  sendDataInput:(value:string) => void
}

const CustomInput: React.FC<props> = ({ nameInput, sendDataInput }) => {
  const [message, setMessage] = useState<string>('')

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    sendDataInput(e.target.value)
  }

  return (
    <input 
      className='Input'
      placeholder={`Enter ${nameInput}`} 
      name={nameInput} 
      value={message}
      onChange={e => setValue(e)}>
    </input>
  )
}

export default CustomInput