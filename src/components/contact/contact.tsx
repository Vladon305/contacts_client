import React, { FC, useCallback, useState } from 'react'
import styles from './contact.module.scss'
import { GrEdit } from 'react-icons/gr'
import { MdDeleteOutline } from 'react-icons/md'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { editContact, removeContact } from '../../store/user/reducers'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IContact } from '../../types/types'

type Props = {
  id: string
  index: number
}

const Contact: FC<Props> = ({ id, index }) => {
  const [NameMod, setNameMod] = useState(false)
  const [PhoneMod, setPhoneMod] = useState(false)

  const dispatch = useAppDispatch()
  const { editUserContact } = useActions()

  const contact = useTypedSelector((state) => state.user.user.contacts.find((contact) => contact._key === id))

  if (!contact) {
    throw new Error('contact not found')
  }
  const [locContact, setLocContact] = useState(contact)

  const deleteContact = useCallback(() => dispatch(removeContact({ contactId: id, index })), [dispatch, id, index])
  const edit = useCallback(
    (contact: IContact) => {
      dispatch(editUserContact(contact))
      dispatch(editContact({ contact, func: editUserContact }))
    },
    [dispatch, editUserContact]
  )

  return (
    <div className={styles.body}>
      <div className={styles.edit}>
        <GrEdit
          fontSize={24}
          onClick={() => {
            edit(locContact)
            setNameMod(false)
            setPhoneMod(false)
          }}
        />
      </div>

      <div className={styles.name} onClick={() => setNameMod(true)}>
        {!NameMod ? (
          <div>
            Name:
            <br />
            <div className={styles.input}>{locContact.name}</div>
          </div>
        ) : (
          <div>
            Name:
            <br />
            <input
              type="text"
              className={styles.input}
              value={locContact.name}
              onChange={(e) => setLocContact({ ...locContact, name: e.currentTarget.value })}
              autoFocus={true}
            />
          </div>
        )}
      </div>

      <div className={styles.phone} onClick={() => setPhoneMod(true)}>
        {!PhoneMod ? (
          <div>
            Phone:
            <br />
            <div className={styles.input}>{locContact.phone}</div>
          </div>
        ) : (
          <div>
            Phone: <br />
            <input
              type="text"
              className={styles.input}
              value={locContact.phone}
              onChange={(e) => setLocContact({ ...locContact, phone: e.currentTarget.value })}
              autoFocus={true}
            />
          </div>
        )}
      </div>
      <div className={styles.delete} onClick={deleteContact}>
        <MdDeleteOutline fontSize={24} />
      </div>
    </div>
  )
}

export default Contact
