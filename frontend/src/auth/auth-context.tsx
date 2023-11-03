import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  Dispatch,
} from "react";
import { firebaseConfig } from "../vendor/firebase-config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useLocalStorage } from "../hooks/use-local-storage";
import { getUser } from "../requests/get-user";

export type User = {
  displayName?: string;
  email?: string;
  phoneNumber: string | null;
};

type AuthContextType = {
  user?: User | null;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
  isAuthenticated: boolean;
  firebaseAuth: firebase.auth.Auth;
  firebaseUiConfig: {
    signInFlow: string;
    signInSuccessUrl: string;
    signInOptions: { provider: string; defaultCountry: string }[];
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
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.phoneNumber) {
        const { phoneNumber } = user;
        getUser({ phoneNumber }).then(({ data }) =>
          setUserInfo({ phoneNumber, ...data }),
        );
      } else {
        setUserInfo(null);
      }
    });
  }, []);

  const logOut = () => {
    firebaseAuth.signOut();
  };

  const firebaseUiConfig = {
    signInFlow: "popup", //redirect
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
    isAuthenticated: Boolean(userInfo),
    firebaseAuth,
    firebaseUiConfig,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext<AuthContextType>(AuthContext);

export { useAuthContext, AuthProvider };
