import { useAppSelector } from '../../hooks/hooksRedux'

const useGetCurrentUser = () => useAppSelector(state => state.auth.user) 
const useGetCurrentUserName = () => useAppSelector(state => state.auth.user.name) 
const useGetCurrentUserId = () => useAppSelector(state => state.auth.user.id) 
const useGetIsLoggedIn = () => useAppSelector(state => state.auth.isLoggedIn) 
const useIsGettingCurrent = () => useAppSelector(state => state.auth.isGetingCurentUser) 
const useGetError = () => useAppSelector(state => state.auth.error) 

const authSelectors = {
  useGetCurrentUser,
  useGetCurrentUserName,
  useGetCurrentUserId,
  useGetIsLoggedIn,
  useIsGettingCurrent,
  useGetError,
}
export default authSelectors
