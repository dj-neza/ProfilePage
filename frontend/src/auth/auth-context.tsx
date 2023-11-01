import { ReactNode, createContext, useContext, useState } from "react";
import { firebaseConfig } from "../vendor/firebase-config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

type User = {
  name: string;
  email: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  firebaseAuth: firebase.auth.Auth;
  firebaseUiConfig: {
    signInFlow: string;
    signInSuccessUrl: string;
    signInOptions: string[];
  };
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// @ts-ignore
const AuthContext = createContext<AuthContextType>();

function AuthProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const firebaseUiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/signedIn",
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
  };

  const value = {
    user: userInfo,
    setUser: setUserInfo,
    firebaseAuth: firebase.auth(),
    firebaseUiConfig,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext<AuthContextType>(AuthContext);

export { useAuthContext, AuthProvider };
