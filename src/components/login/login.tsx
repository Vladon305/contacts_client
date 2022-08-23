import React, { Dispatch, FC, SetStateAction } from 'react'
import styles from './login.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import User from '../../assets/user.svg'
import Key from '../../assets/key.svg'
import { useLogInMutation } from '../../store/userSlice'
import { IAuthResponse } from '../../types/types'

type Props = {
  setIsAuth: Dispatch<SetStateAction<boolean>>
  setIsLogin: Dispatch<SetStateAction<boolean>>
  setUserId: Dispatch<SetStateAction<number | undefined>>
}

type Inputs = {
  email: string
  password: string
}

const Login: FC<Props> = ({ setIsLogin, setIsAuth, setUserId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange'
  })

  const [logIn, { data: res, isLoading }] = useLogInMutation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await logIn({ ...data, contacts: [] })
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
            {...register('email', {
              required: 'Email is required field!',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter valid email'
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
                value:
                  /([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+)/,
                message: 'Please enter valid password'
              }
            })}
            placeholder='Password'
            type='password'
            className={styles.input}
          />
        </div>
        <div className={styles.error}>{errors?.password && <div>{errors.password.message}</div>}</div>
        <button className={styles.button} type='submit'>
          Log in
        </button>
      </form>
      <div className={styles.ref}>
        <button onClick={() => setIsLogin(false)}>Sing up</button>
      </div>
    </>
  )
}

export default Login
