export type IContact = {
  id: number
  name: string
  phone: string
}

export type IUser = {
  id: number
  name: string
  email: string
  password: string
  contacts: IContact[]
}

export type IAuthDto = {
  email: string
  password: string
  contacts: []
}

export type IAuthResponse = {
  accessToken: string
  user: IUser
}
