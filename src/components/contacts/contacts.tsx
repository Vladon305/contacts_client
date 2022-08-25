import React, { FC } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import AddContact from '../addContact/addContact'
import Contact from '../contact/contact'
import styles from './contacts.module.scss'

type Props = {}

const Contacts: FC<Props> = () => {
  const { user } = useTypedSelector((state) => state.user)

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <AddContact userId={user?._id} />
        <div className={styles.contacts}>
          {user?.contacts?.map((cont, i) => (
            <Contact key={cont._key} id={cont._key} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contacts
