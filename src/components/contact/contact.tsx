import React, { FC } from 'react'
import styles from './contact.module.scss'

type Props = {
  name: string
  phone: string
}

const Contact: FC<Props> = ({ name, phone }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{phone}</div>
    </div>
  )
}

export default Contact
