export interface ISocketMembers {
  id: string;
  name: string;
}

export interface ISocketMessage {
  id: string;
  ownerId: String,
  message: string;
  owner: string;
}

export interface ISocketOwner {
  id: string;
  name: string;
}

export interface ISocketRoom {
  id: string,
  nameRoom: string,
  owner: ISocketOwner,
  member: ISocketMembers[] | [],
  messages: ISocketMessage[] | [],
}

export interface ISocketConnected {
  message: string,
  room: ISocketRoom,
}

export interface ISocketDisconnected {
  message: string,
  room: ISocketRoom,
}

export interface ISocketNewMessage {
  id: String,
  ownerId: String,
  owner: String,
  message: String
}