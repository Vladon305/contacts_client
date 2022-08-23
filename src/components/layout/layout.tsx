import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import styles from './layout.module.scss'

type Props = {
  children?: ReactNode
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

const Layout: React.FC<Props> = ({ children, setIsLogin }) => {
  return (
    <div className={styles.screen}>
      <header>logout</header>
      <main className={styles.container}>{children}</main>
    </div>
  )
}

export default Layout
