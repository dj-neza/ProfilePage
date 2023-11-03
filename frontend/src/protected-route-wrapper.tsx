import { ReactNode } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuthContext } from "./auth/auth-context";

type ProtectedRouteWrapperProps = {
  children: ReactNode;
};
export function ProtectedRouteWrapper({
  children,
}: ProtectedRouteWrapperProps) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  return children;
}
