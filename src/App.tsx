import React, { useContext, useEffect, useState } from 'react'
import Contacts from './components/contacts/contacts'
import Layout from './components/layout/layout'
import Login from './components/login/login'
import Registration from './components/registration/registration'
import { AuthContext } from './hooks/AuthContext'
import { useActions } from './hooks/useActions'
import { fetchUser } from './utils/fetchUser'

const App: React.FC = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true)

  const { setUser } = useActions()
  useEffect(() => {
    const user = fetchUser()
    if (!user) setIsAuth(false)
    else {
      setIsAuth(true)
      setUser(user)
    }
  }, [setIsAuth, setUser])

  return (
    <Layout setIsLogin={setIsLogin}>
      {!isAuth ? (
        isLogin ? (
          <Login setIsAuth={setIsAuth} setIsLogin={setIsLogin} />
        ) : (
          <Registration setIsAuth={setIsAuth} setIsLogin={setIsLogin} />
        )
      ) : (
        <Contacts />
      )}
    </Layout>
  )
}

export default App
