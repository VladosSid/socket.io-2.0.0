export interface IUser {
  id: string | null,
  name: string | null,
  online: boolean,
}

export interface IStateUser {
  user: IUser,
  isLoggedIn: boolean,
  isGetingCurentUser: boolean, 
  error: null | string,
}