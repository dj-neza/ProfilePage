import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/auth-context'
import { SignIn } from './pages/sign-in'
import { ProtectedRouteWrapper } from './protected-route-wrapper'
import { Profile } from './pages/profile'
import { GlobalStyles } from './styles/global-styles'
import { useLocalStorage } from './hooks/use-local-storage'
import { useEffect } from 'react'
import {
  animals,
  adjectives,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import { NotificationProvider } from './contexts/notification-context'
import { Notifications } from './components/notifications'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <ProtectedRouteWrapper>
            <Profile />
          </ProtectedRouteWrapper>
        }
      />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/*" element={<Navigate to="/profile" />} />
    </Routes>
  )
}
export function App() {
  const [generatedName, setGeneratedName] = useLocalStorage<string | null>(
    'generatedName',
    null,
  )

  useEffect(() => {
    if (!generatedName) {
      const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: ' ',
        length: 2,
        style: 'capital',
      })
      setGeneratedName(randomName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NotificationProvider>
      <AuthProvider generatedName={generatedName ?? null}>
        <GlobalStyles />
        <BrowserRouter>
          <AppRoutes />
          <Notifications />
        </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>
  )
}
