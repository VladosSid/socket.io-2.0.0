import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom';
import authSelectors from '../reduxToolkit/selectors/selectorsUser'

interface IProps {
  component: JSX.Element,
  redirectTo: string,
}
const PrivateRoute:React.FC<IProps> = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = authSelectors.useGetIsLoggedIn();
  const isRefreshing = authSelectors.useIsGettingCurrent();

  const shouldRedirect = !isRefreshing && !isLoggedIn;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component
}
export default PrivateRoute
