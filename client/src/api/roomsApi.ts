import { instanceApi } from '../reduxToolkit/operations/instance'

import type { IListRooms } from '../components/types/Rooms'


async function requestApi<T> (url:string): Promise<T> {
    const { data } = await instanceApi.get(url);
    return data.data.rooms
}

const getAllRooms = () => {
  const data = requestApi<IListRooms[]>('room/getrooms')
  return data
}

export {
  getAllRooms,
}