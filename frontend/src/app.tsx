import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/auth-context";
import { SignIn } from "./pages/sign-in";
import { ProtectedRouteWrapper } from "./protected-route-wrapper";
import { Profile } from "./pages/profile";

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
  );
}
export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
