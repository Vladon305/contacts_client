import { createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { createAPI, deleteAPI, fetchingAPI, patchAPI } from '../../api/api'
import { createContactDto, createUserDto, IUser, removeContactDto } from '../../types/types'
import { userQuery, usersQuery } from '../../utils/data'

export const getUser = createAsyncThunk('user/getUser', async (id: number, { rejectWithValue }) => {
  try {
    const query = userQuery(id)
    return await fetchingAPI(query).then((data) => {
      return data[0]
    })
  } catch (e) {
    return rejectWithValue('request problem')
  }
})

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: createUserDto, { rejectWithValue }) => {
    try {
      const doc = {
        _type: 'user',
        email,
        password,
      }
      return await createAPI(doc).then((data) => {
        return data[0]
      })
    } catch (e) {
      return rejectWithValue('request problem')
    }
  }
)

export const login = createAsyncThunk('user/login', async ({ email, password }: createUserDto, { rejectWithValue }) => {
  try {
    const users: IUser[] = await fetchingAPI(usersQuery())
    const verifiedByEmail = users.find((user) => user.email === email)
    const verifiedByPassword = verifiedByEmail?.password === password ? verifiedByEmail : null
    return verifiedByPassword
  } catch (e) {
    return rejectWithValue('request problem')
  }
})

export const addContact = createAsyncThunk(
  'user/addContact',
  async ({ name, phone, userId }: createContactDto, { rejectWithValue }) => {
    try {
      const doc = {
        _key: uuid(),
        _type: 'contact',
        name,
        phone,
        postedBy: {
          _type: 'postedBy',
          _ref: userId,
        },
      }
      return await patchAPI(
        userId,
        { contacts: [] },
        {
          at: 'after',
          selector: 'contacts[-1]',
          items: [doc],
        }
      ).then((data) => {
        return data.contacts
      })
    } catch (e) {
      return rejectWithValue('request problem')
    }
  }
)

export const removeContact = createAsyncThunk(
  'user/removeContact',
  async ({ contactId, index }: removeContactDto, { rejectWithValue }) => {
    try {
      await deleteAPI('user', [`contacts[${index}]`, 'contacts'])
      return contactId
    } catch (e) {
      return rejectWithValue('request problem')
    }
  }
)

export const editContact = createAsyncThunk(
  //made this
  'user/editContact',
  async ({ contactId, index }: removeContactDto, { rejectWithValue }) => {
    try {
      await deleteAPI('user', [`contacts[${index}]`]) //нужно изменить здесь
      return contactId
    } catch (e) {
      return rejectWithValue('request problem')
    }
  }
)
