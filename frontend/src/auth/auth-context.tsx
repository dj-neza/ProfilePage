import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  useState,
} from "react";
import { firebaseConfig } from "../vendor/firebase-config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useLocalStorage } from "../hooks/use-local-storage";
import { getUser } from "../requests/get-user";

export type User = {
  name?: string;
  email?: string;
  phoneNumber: string | null;
};

type AuthContextType = {
  user?: User | null;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  firebaseAuth: firebase.auth.Auth;
  firebaseUiConfig: {
    signInFlow: string;
    signInSuccessUrl: string;
    signInOptions: { provider: string; defaultCountry: string }[];
  };
  logOut: () => void;
  generatedName: string | null;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// @ts-ignore
const AuthContext = createContext<AuthContextType>();

function AuthProvider({
  children,
  generatedName,
}: {
  children: ReactNode;
  generatedName: string | null;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useLocalStorage<User | null>(
    "userInfo",
    null,
  );

  const firebaseAuth = firebase.auth();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.phoneNumber) {
        const { phoneNumber } = user;
        setIsAuthenticated(true);
        setIsLoading(true);
        getUser({ phoneNumber }).then(({ data }) => {
          setUserInfo({ phoneNumber, ...data });
          setIsLoading(false);
        });
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
    });
  }, [setUserInfo]);

  const logOut = () => {
    firebaseAuth.signOut();
  };

  const firebaseUiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/profile",
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: "SE",
      },
    ],
  };

  const value = {
    user: userInfo,
    setUser: setUserInfo,
    isAuthenticated,
    isLoading,
    firebaseAuth,
    firebaseUiConfig,
    logOut,
    generatedName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext<AuthContextType>(AuthContext);

export { useAuthContext, AuthProvider };
