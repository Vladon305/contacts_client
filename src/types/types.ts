export type IUser = {
  _id: string
  name: string
  email: string
  password: string
  contacts: IContact[]
  _createdAt: string
  _updatedAt: string
}

export type IContact = {
  _key: string
  name: string
  phone: string
  postedBy: IPostedBy
  _createdAt: string
  _updatedAt: string
}

export type IPostedBy = {
  _ref: string | number | undefined | null
  _type: string
}

export type createUserDto = {
  email: string
  password: string
}

export type createContactDto = {
  name: string
  phone: string
  userId: string
}

export type removeContactDto = {
  contactId: string
  index: number
}
