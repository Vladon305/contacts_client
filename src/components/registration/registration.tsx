import React, { Dispatch, FC, SetStateAction } from 'react'
import styles from './registration.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import User from '../../assets/user.svg'
import Key from '../../assets/key.svg'
import { useSingUpMutation } from '../../store/userSlice'
import { IAuthResponse } from '../../types/types'

type Props = {
  setIsAuth: Dispatch<SetStateAction<boolean>>
  setIsLogin: Dispatch<SetStateAction<boolean>>
  setUserId: Dispatch<SetStateAction<number | undefined>>
}

type Inputs = {
  name: string
  email: string
  password: string
}

const Registration: FC<Props> = ({ setIsLogin, setIsAuth, setUserId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange'
  })

  const [singIn, { data: res, isLoading }] = useSingUpMutation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await singIn({ ...data, contacts: [] })
    setUserId(res?.user.id)
    setIsAuth(true)
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <div className={styles.label}>
            <img src={User} alt='user' />
          </div>
          <input
            {...register('name', {
              required: 'Name is required field!'
            })}
            placeholder='Name'
            type='text'
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            <img src={User} alt='user' />
          </div>
          <input
            {...register('email', {
              required: 'Email is required field!',
              pattern: {
                message: 'Please enter valid email',
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              }
            })}
            placeholder='Email'
            type='text'
            className={styles.input}
          />
        </div>
        <div className={styles.error}>{errors?.email && <div>{errors.email.message}</div>}</div>

        <div className={styles.row}>
          <div className={styles.label}>
            <img src={Key} alt='key' />
          </div>
          <input
            {...register('password', {
              required: 'Password is required field!',
              pattern: {
                message: 'Please enter valid password',
                value:
                  /([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+)/
              }
            })}
            placeholder='Password'
            type='password'
            className={styles.input}
          />
        </div>
        <div className={styles.error}>
          {errors?.password && <div className='form-error'>{errors.password.message}</div>}
        </div>
        <button className={styles.button} type='submit'>
          Sing up
        </button>
      </form>
      <div className={styles.ref}>
        <button onClick={() => setIsLogin(true)}>Log in</button>
      </div>
    </>
  )
}

export default Registration
