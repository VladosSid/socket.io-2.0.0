import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

import authSelectors from '../../reduxToolkit/selectors/selectorsUser'

import { useAppDispatch } from '../../hooks/hooksRedux'
import { useNamingHeader } from '../../hooks/namingHeader'
import operations from '../../reduxToolkit/operations/operationsUsers'

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch()

  const isLoginPage = location.pathname === '/login';
  const buttonText = isLoginPage ? 'Sign Up' : 'Log In';
  const buttonPath = isLoginPage ? '/signup' : '/login';

  const isChatPage = location.pathname.split('/')[1] === 'chat'

  const isLoggedIn = authSelectors.useGetIsLoggedIn()

  const namePage = useNamingHeader(location.pathname);
  
  const logOut = async (evt:MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    await dispatch(operations.logout(''))
    navigate('/login')
  }

  const disconectRoom = async (evt:MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    navigate('/rooms')
  }
  return (
    <header className='Header'>
      <b className='Header__user-name'>{authSelectors.useGetCurrentUserName()}</b>
      
      <h3 className='Header__name-page'>{namePage}</h3>

      <div>
        {isChatPage ? 
          <button 
            className='Header_button' 
            style={{marginRight: '15px'}}
            onClick={disconectRoom}
          >Disconected</button> :
          null
        }

        {!isLoggedIn 
        ? <Link to={buttonPath}>
            <button className='Header_button'>{buttonText}</button>
          </Link>
        : <button onClick={e => logOut(e)} className='Header_button'>Log Out</button>}
      </div>
    </header>
  );
};

export default Header;
