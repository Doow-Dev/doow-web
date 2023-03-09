import React, { createContext, useContext, useEffect, useReducer } from "react";
import { MemberDto} from "../../generated/graphql";

import { initialState, AuthReducer, AgentInfoInterface } from "./authReducer";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface LoginCredentials {
  phone_number: string;
  password: string;
}
export interface SignUpCredentials {
  phone_number: string;
  password: string;
}

export interface AuthState {
  me:MemberDto | null;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  errorMessage: string | null;
}

export const AuthStateContext = React.createContext<AuthState>(initialState);
const AuthDispatchContext = createContext<any>({});

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("@me"))) {
      // get the stored values
      let user = localStorage.getItem("@me")
        ? JSON.parse(localStorage.getItem("@me"))
        : null;
      let accessToken = localStorage.getItem("@accessToken")
        ? JSON.parse(localStorage.getItem("@accessToken"))
        : null;
      let refreshToken = localStorage.getItem("@refreshToken")
        ? JSON.parse(localStorage.getItem("@refreshToken"))
        : null;
      let agentInfo = localStorage.getItem("@agentInfo")
        ? JSON.parse(localStorage.getItem("@agentInfo"))
        : null;

      const storedState = {
        me: user,
        agentInfo,
        accessToken,
        refreshToken,
        loading: false,
        errorMessage: null,
      };

      //hydrate state with the values from localStorage
      dispatch({
        type: "INIT_STORE",
        payload: { ...storedState, loading: false, errorMessage: null },
      });
    }
  }, []);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
