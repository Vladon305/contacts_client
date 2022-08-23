import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuid, v4 } from 'uuid'
import { useAddContactMutation } from '../../store/userSlice'
import styles from './addContact.module.scss'

export type Inputs = {
  name: string
  phone: string
}
type Props = {
  userId: number
}

const AddContact: FC<Props> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [addContact, { data, isLoading }] = useAddContactMutation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addContact({ userId, body: { ...data, id: +uuid() } })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <input
          {...register('name', {
            required: 'Name is required field!',
          })}
          placeholder="Enter name"
          type="text"
          className={styles.input}
        />
        <div className={styles.error}>
          {errors?.name && <div>{errors.name.message}</div>}
        </div>
      </div>
      <div className={styles.row}>
        <input
          {...register('phone', {
            required: 'Number is required field!',
          })}
          placeholder="Enter number"
          type="text"
          className={styles.input}
        />
        <div className={styles.error}>
          {errors?.phone && <div>{errors.phone.message}</div>}
        </div>
      </div>

      <button className={styles.button}>Add contact</button>
    </form>
  )
}

export default AddContact
