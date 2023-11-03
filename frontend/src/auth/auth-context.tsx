import { ReactNode, createContext, useContext, useEffect } from "react";
import { firebaseConfig } from "../vendor/firebase-config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useLocalStorage } from "../hooks/use-local-storage";

type User = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
};

type AuthContextType = {
  user?: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  firebaseAuth: firebase.auth.Auth;
  firebaseUiConfig: {
    signInFlow: string;
    signInSuccessUrl: string;
    signInOptions: string[];
  };
  logOut: () => void;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// @ts-ignore
const AuthContext = createContext<AuthContextType>();

function AuthProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useLocalStorage<User | null>(
    "userInfo",
    null,
  );

  const firebaseAuth = firebase.auth();

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          const { displayName, email, phoneNumber } = user;
          setUserInfo({
            displayName,
            email,
            phoneNumber,
          });
        } else {
          setUserInfo(null);
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  const logOut = () => {
    firebaseAuth.signOut();
  };

  const firebaseUiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/profile",
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
  };

  const value = {
    user: userInfo,
    setUser: setUserInfo,
    isAuthenticated: Boolean(userInfo),
    firebaseAuth,
    firebaseUiConfig,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext<AuthContextType>(AuthContext);

export { useAuthContext, AuthProvider };
