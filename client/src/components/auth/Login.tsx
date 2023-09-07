import React, { FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks/hooksRedux'
import operations from '../../reduxToolkit/operations/operationsUsers'

import './Auth.css'

import CustomInput from './CustomInput'

interface props {
  nameForm: string
}

const Login:React.FC<props> = ({ nameForm }) => {
  // const [errorValid, setErrorValid] = useState<boolean>(false)
  // const [errorMessage, seterrorMessage] = useState<string>('')
  
  const [login, setLogin] = useState<string>('SupetTester')
  const [password, setPassword] = useState<string>('123')
  const [secondPassword, setSecondPassword] = useState<string>('')


  const dispatch = useAppDispatch()

  const signIn = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nameForm === 'SignUp') {
      if (password !== secondPassword) { 
        alert('Паролі не співпадають!!!')
        return
      }
      console.log('SignUp user');
      // POST api SignUp
      return
    }

    const res = await dispatch(operations.login({
      name: login,
      password: password
    }))

    if (res.meta.requestStatus === 'rejected') {
      return
    }
  }

  return (
  <div style={{width: "100vw", display: 'flex', alignItems: "center", justifyContent: 'center'}}>
    <form name={nameForm} className='Form' onSubmit={e => signIn(e)}>
      <h3>{nameForm}</h3>
      <CustomInput nameInput="Login" sendDataInput={setLogin}/>
      <CustomInput nameInput="Password" sendDataInput={setPassword}/>
      {
        nameForm === 'SignUp' ? 
        <CustomInput nameInput="repeat Password" sendDataInput={setSecondPassword}/> :
        null
      }
      <button className='Button' name={nameForm} type='submit' disabled={login.length === 0 || password.length === 0}>{nameForm}</button>
    </form>
  </div>
  )
}


export default Login