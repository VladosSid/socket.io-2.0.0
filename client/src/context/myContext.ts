import React, {useContext, createContext} from 'react'
import type { ISocketRoom, ISocketMessage } from '../components/types/Socket'

export const RoomContext = createContext<ISocketRoom | null>(null);

export const MessageContext = createContext<ISocketMessage[] | null>(null)

export const useMyContext = <T>(value: React.Context<T>) => useContext(value);