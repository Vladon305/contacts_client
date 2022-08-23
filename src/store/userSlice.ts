import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAuthDto, IAuthResponse, IContact, IUser } from '../types/types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    logIn: builder.mutation<IAuthResponse, IAuthDto>({
      query: (body) => ({ url: `login`, method: 'POST', body: body }),
      transformResponse: (response: IAuthResponse) => response,
      invalidatesTags: ['User'],
    }),
    singUp: builder.mutation<IAuthResponse, IAuthDto>({
      query: (body) => ({ url: `signup`, method: 'POST', body: body }),
      invalidatesTags: ['User'],
    }),
    getContacts: builder.query<IContact[], number>({
      query: (id) => `users/${id}`,
      transformResponse: (response: IUser) => response.contacts,
      providesTags: ['User'],
    }),
    addContact: builder.mutation<IContact, { userId: number; body: IContact }>({
      query: (data) => ({
        url: `users/${data.userId}/contacts`,
        method: 'PUT',
        body: data.body,
      }),
      invalidatesTags: ['User'],
    }),
    editContact: builder.mutation<IContact, { userId: number; body: IContact }>(
      {
        query: (data) => ({
          url: `users/${data.userId}/contacts`,
          method: 'PATCH',
          body: data.body,
        }),
        invalidatesTags: ['User'],
      }
    ),
  }),
})

export const {
  useLogInMutation,
  useSingUpMutation,
  useGetContactsQuery,
  useAddContactMutation,
  useEditContactMutation,
} = userApi
