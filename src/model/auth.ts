export interface IUserType {
  'id': number,
  'name': string,
  'status_id': number,
  'created_at': string,
  'updated_at': string
}

export interface IUser {
  id: number,
  email: string,
  fullname: string,
  phone_number: string,
  facebook: string,
  location: string,
  lat: string,
  lng: string,
  'updated_at': string,
  'status_id': number,
  'user_type_id': number,
  userType: IUserType
}

export interface IToken {
  type: string,
  token: string,
  refreshToken: string
}

export interface ILoginRequest {
  email: string,
  password: string
}

export interface ILoginResponse {
  accessToken: IToken,
  user: IUser
}
