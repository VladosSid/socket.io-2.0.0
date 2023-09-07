import React from 'react';
import authSelectors from '../reduxToolkit/selectors/selectorsUser'
const { Navigate } = require('react-router-dom');


interface IProps {
  component: JSX.Element,
  redirectTo: string
}

const RestrictedRoute:React.FC<IProps> = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = authSelectors.useGetIsLoggedIn();  

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
