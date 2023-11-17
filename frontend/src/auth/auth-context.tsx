import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  useState,
} from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useLocalStorage } from '../hooks/use-local-storage'
import { getUser } from '../requests/get-user'
import { useNotificationContext } from '../contexts/notification-context'
import { firebaseInstance } from '../vendor/firebase'

export type User = {
  name?: string
  email?: string
  phoneNumber: string | null
}

type AuthContextType = {
  user?: User | null
  setUser: Dispatch<SetStateAction<User | null | undefined>>
  isAuthenticated: boolean
  isLoading: boolean
  firebaseAuth: firebase.auth.Auth
  firebaseUiConfig: {
    signInFlow: string
    signInSuccessUrl: string
    signInOptions: { provider: string; defaultCountry: string }[]
  }
  logOut: () => void
  generatedName: string | null
}

// @ts-ignore
const AuthContext = createContext<AuthContextType>()

function AuthProvider({
  children,
  generatedName,
}: {
  children: ReactNode
  generatedName: string | null
}) {
  const [userInfo, setUserInfo] = useLocalStorage<User | null>('userInfo', null)
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(userInfo))
  const { addNotification } = useNotificationContext()
  const [isLoading, setIsLoading] = useState(false)

  const firebaseAuth = firebaseInstance.auth()

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(true)
        setIsLoading(true)
        getUser()
          .then(({ data }) => {
            setUserInfo(data as any)
          })
          .catch((error) => {
            addNotification({
              message: error.message ?? 'Something unexpected happened.',
            })
          })
          .finally(() => setIsLoading(false))
      } else {
        setIsAuthenticated(false)
        setUserInfo(null)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logOut = () => {
    firebaseAuth.signOut()
  }

  const firebaseUiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/profile',
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: 'SE',
      },
    ],
  }

  const value = {
    user: userInfo,
    setUser: setUserInfo,
    isAuthenticated,
    isLoading,
    firebaseAuth,
    firebaseUiConfig,
    logOut,
    generatedName,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext<AuthContextType>(AuthContext)

export { useAuthContext, AuthProvider }
