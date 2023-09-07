import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import RestrictedRoute from '../Router/RestrictedRoute'
import PrivateRoute from '../Router/PrivateRoute'

import authSelectors from '../reduxToolkit/selectors/selectorsUser'

import Header from './header/Header'
const Users = lazy(() => import('./users/Users'))
const PageChat = lazy(() => import('./chat/PageChat'))
const Login = lazy(() => import('./auth/Login'))
const Rooms = lazy(() => import('./rooms/Rooms'))

function App() {
  const isGetingCurent = authSelectors.useGetCurrentUser()
  return (
    <>
    {!isGetingCurent ? 
      (<div>Loading...</div>) :
      (<Suspense fallback={'Loading...'}>
        <div className="App">
          <Header></Header>
          <main className='App-main'>
            <Routes>
              <Route 
                index
                path='/login' 
                element={
                  <RestrictedRoute
                  component={<Login nameForm="Login"/>}
                  redirectTo='/rooms'/>
                } 
              />

              <Route
                path='/signup' 
                element={
                  <RestrictedRoute
                  component={<Login nameForm="SignUp"/>}
                  redirectTo='/rooms'/>
                } 
              />

              <Route
                path='/rooms'
                element={<PrivateRoute component={<Rooms />} redirectTo='/login'/>}
              />

              <Route
                path='/chat/:chatId'
                element={<PrivateRoute component={<PageChat />} redirectTo='/login'/>}
              />
            </Routes>
          </main>
        </div>
      </Suspense>)}
    </>
  );
}

export default App;
