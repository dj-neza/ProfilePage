import { AuthProvider } from "./auth/auth-context";
import { SignIn } from "./pages/sign-in";

export function App() {
  return (
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  );
}
