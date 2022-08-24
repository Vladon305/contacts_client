import React, { FC, useCallback } from 'react'
import styles from './contact.module.scss'
import { GrEdit } from 'react-icons/gr'
import { MdDeleteOutline } from 'react-icons/md'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { removeContact } from '../../store/user/reducers'

type Props = {
  id: string
  index: number
  name: string
  phone: string
}

const Contact: FC<Props> = ({ id, index, name, phone }) => {
  const dispatch = useAppDispatch()

  const deleteContact = useCallback(() => dispatch(removeContact({ contactId: id, index })), [dispatch, id, index])

  const editContact = useCallback(() => dispatch(removeContact({ contactId: id, index })), [dispatch, id, index])

  return (
    <div className={styles.body}>
      <div className={styles.edit}>
        <GrEdit fontSize={24} />
      </div>
      <div className={styles.name}>Name: {name}</div>
      <div className={styles.phone}>Phone: {phone}</div>
      <div className={styles.delete} onClick={deleteContact}>
        <MdDeleteOutline fontSize={24} />
      </div>
    </div>
  )
}

export default Contact
