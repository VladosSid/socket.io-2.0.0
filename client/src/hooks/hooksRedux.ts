import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import type {RootState, AppDispath} from '../reduxToolkit/store'

export const useAppDispatch = () => useDispatch<AppDispath>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;