import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContact, IUser } from '../../types/types'
import { createUser, getUser, login, addContact, editContact, removeContact } from './reducers'

const initialState = {
  user: null as unknown as IUser,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    editUserContact: (state, action: PayloadAction<IContact>) => {
      const contactIndex = state.user.contacts.findIndex((contact) => contact._key === action.payload._key)
      state.user.contacts[contactIndex] = action.payload
    },
  },
  extraReducers: {
    [getUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    [createUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    [addContact.fulfilled.type]: (state, action: PayloadAction<IContact[]>) => {
      state.user.contacts = action.payload
    },
    [editContact.fulfilled.type]: (state, action: PayloadAction<IContact>) => {
      const index = state.user.contacts.findIndex((contact) => contact._key === action.payload._key)
      state.user.contacts[index] = action.payload
    },
    [removeContact.fulfilled.type]: (state, action) => {
      state.user.contacts = state.user.contacts.filter((contact) => contact._key !== action.payload)
    },
    [login.fulfilled.type]: (state, action: PayloadAction<IUser | null>) => {
      if (action.payload) {
        state.user = action.payload
      } else {
        throw new Error('User not authorized')
      }
    },
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
