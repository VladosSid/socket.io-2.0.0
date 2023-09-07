// ROOMS STORE
export interface IMembersRoom {
  id: string | null,
  name: string | null, 
}

export interface IMessagesRoom {
  id: string | null,
  message: string | null,
  owner: string | null,
}

export interface IListRooms {
  id: string | null,
  nameRoom: string | null,
  owner: IMembersRoom,
  member: number | null,
}

export interface IListRoomsReq {
  rooms: IListRooms[]
}


