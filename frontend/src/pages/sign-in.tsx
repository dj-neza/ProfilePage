import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../auth/auth-context'
import FirebaseAuth from '../components/firebase-auth'
import { PageWrapper } from '../components/page-wrapper'
import { Heading } from '../components/heading'
import { ContentWrapper } from '../components/content-wrapper'
import { Loader } from '../components/loader'

export function SignIn() {
  const { firebaseAuth, firebaseUiConfig } = useAuthContext()
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext()

  if (isAuthLoading) {
    return (
      <PageWrapper>
        <ContentWrapper $verticallyCenter>
          <Loader />
        </ContentWrapper>
      </PageWrapper>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/profile" />
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <Heading>Sign in</Heading>
        <FirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebaseAuth} />
      </ContentWrapper>
    </PageWrapper>
  )
}
