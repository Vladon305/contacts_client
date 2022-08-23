import React, { FC } from 'react'
import { useGetContactsQuery } from '../../store/userSlice'
import AddContact from '../addContact/addContact'
import Contact from '../contact/contact'
import styles from './contacts.module.scss'

type Props = {
  userId: number
}

const Contacts: FC<Props> = ({ userId }) => {
  const { data, isLoading } = useGetContactsQuery(userId)
  console.log(data)

  return (
    <div>
      <AddContact userId={userId} />
      {data?.map((cont) => (
        <Contact key={cont.id} name={cont.name} phone={cont.phone} />
      ))}
    </div>
  )
}

export default Contacts
