import React, { FC, useEffect, useState } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import AddContact from '../addContact/addContact'
import Contact from '../contact/contact'
import Search from '../search/search'
import styles from './contacts.module.scss'

type Props = {}

const Contacts: FC<Props> = () => {
  const [searchMod, setSearchMod] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useTypedSelector((state) => state.user)

  const { searchContacts } = useActions()
  const { searchedContacts } = useTypedSelector((state) => state.user)

  useEffect(() => {
    searchContacts(searchTerm)
    // eslint-disable-next-line
  }, [user.contacts, searchTerm])

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <AddContact userId={user?._id} />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchMod={setSearchMod} />
        <div className={styles.contacts}>
          {!searchMod
            ? user?.contacts?.map((cont, i) => <Contact key={cont._key} index={i} contact={cont} />)
            : searchedContacts?.length !== 0 &&
              searchedContacts?.map((cont, i) => <Contact key={cont._key} index={i} contact={cont} />)}
          {searchedContacts?.length === 0 && searchTerm !== '' && (
            <div className="mt-10 text-center text-xl">No Contacts Found!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contacts
