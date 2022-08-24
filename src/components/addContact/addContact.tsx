import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addContact } from '../../store/user/reducers'
import styles from './addContact.module.scss'

export type Inputs = {
  name: string
  phone: string
}
type Props = { userId: string }

const AddContact: FC<Props> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(addContact({ ...data, userId }))
    reset()
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
        <div className={styles.error}>{errors?.name && <div>{errors.name.message}</div>}</div>
      </div>
      <div className={styles.row}>
        <input
          {...register('phone', {
            required: 'Number is required field!',
            pattern: {
              message: 'Please enter number',
              value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
            },
          })}
          placeholder="Enter number"
          type="tel"
          className={styles.input}
        />
        <div className={styles.error}>{errors?.phone && <div>{errors.phone.message}</div>}</div>
      </div>

      <button className={styles.button}>Add contact</button>
    </form>
  )
}

export default AddContact
