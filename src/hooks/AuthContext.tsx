import { createContext, Dispatch, FC, ReactNode, SetStateAction, useMemo, useState } from 'react'

interface IContext {
  isAuth: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<IContext>({} as IContext)

type Props = {
  children: ReactNode
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)

  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
