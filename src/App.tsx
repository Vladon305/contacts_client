import React, { useContext, useState } from 'react'
import Contacts from './components/contacts/contacts'
import Layout from './components/layout/layout'
import Login from './components/login/login'
import Registration from './components/registration/registration'
import { AuthContext } from './hooks/AuthContext'

const App: React.FC = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true)
  const [userId, setUserId] = useState<number>()

  return (
    <Layout setIsLogin={setIsLogin}>
      {!isAuth ? (
        isLogin ? (
          <Login setIsAuth={setIsAuth} setIsLogin={setIsLogin} setUserId={setUserId} />
        ) : (
          <Registration setIsAuth={setIsAuth} setIsLogin={setIsLogin} setUserId={setUserId} />
        )
      ) : (
        <Contacts userId={userId ? userId : 1} />
      )}
    </Layout>
  )
}

export default App
