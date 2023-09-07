import React, {useContext, createContext} from 'react'
import type { ISocketRoom } from '../components/types/Socket'

export const RoomContext = createContext<ISocketRoom | null>(null);

export const useMyContext = <T>(value: React.Context<T>) => useContext(value);