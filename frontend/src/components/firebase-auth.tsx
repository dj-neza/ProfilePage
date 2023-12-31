import { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import styled from 'styled-components'
import { firebaseUiOverrides } from '../styles/firebaseui-overrides'

const WrapperWithStylingOverrides = styled.div({
  ...firebaseUiOverrides,
})

type FirebaseAuthProps = {
  uiConfig: firebaseui.auth.Config
  firebaseAuth: any
}

const FirebaseAuth = ({ uiConfig, firebaseAuth }: FirebaseAuthProps) => {
  const [userSignedIn, setUserSignedIn] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    // Get or Create a firebaseUI instance.
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseAuth)
    if (uiConfig.signInFlow === 'popup') firebaseUiWidget.reset()

    // We track the auth state to reset firebaseUi if the user signs out.
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn) firebaseUiWidget.reset()
      setUserSignedIn(!!user)
    })

    // Render the firebaseUi Widget.
    // @ts-ignore
    firebaseUiWidget.start(elementRef.current, uiConfig)

    return () => {
      unregisterAuthObserver()
      firebaseUiWidget.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseui, uiConfig])

  return <WrapperWithStylingOverrides ref={elementRef} />
}

export default FirebaseAuth
