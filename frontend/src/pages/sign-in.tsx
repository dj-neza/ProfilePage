import { Navigate } from "react-router-dom";
import { useAuthContext } from "../auth/auth-context";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export function SignIn() {
  const { firebaseAuth, firebaseUiConfig } = useAuthContext();
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth
        uiConfig={firebaseUiConfig}
        firebaseAuth={firebaseAuth}
      />
    </div>
  );
}
