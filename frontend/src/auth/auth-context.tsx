import { ReactNode, useContext, useState } from "react";

type User = {
  name: string;
  email: string;
  phone: string;
};

type AuthContextType = {
  user: User;
  setUser: (authBody: User) => void;
};

// @ts-ignore
const AuthContext = createContext<AuthContextType>();

function AuthProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const value = {
    user: userInfo,
    setUser: setUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext<AuthContextType>(AuthContext);

export { useAuthContext, AuthProvider };
