import { MemberDto } from "../../generated/graphql";

export interface ActionType {
  type:
    | "REQUEST_SIGNUP"
    | "SIGNUP_SUCCESS"
    | "SIGNUP_ERROR"
    | "REQUEST_LOGIN"
    | "LOGIN_SUCCESS"
    | "LOGIN_ERROR"
    | "LOGOUT"
    | "INIT_STORE";
  payload?: any;
}

export const storeAuthState = (
  member: MemberDto,
  accessToken: string,
  refreshToken: string
) => {
  localStorage.setItem("@me", JSON.stringify(member));
  localStorage.setItem("@accessToken", JSON.stringify(accessToken));
  localStorage.setItem("@refreshToken", JSON.stringify(refreshToken));
};

export const clearAuthState = () => {
  localStorage.removeItem("@me");
  localStorage.removeItem("@accessToken");
  localStorage.removeItem("@refreshToken");
};

export interface AgentInfoInterface {
  state?: string | undefined;
  lga?: string | undefined;
  ward?: string | undefined;
  polling_unit?: string | undefined;
}
export interface AuthUserInterface {
  email: string;
  first_name: string;
  last_name: string;
  state: string;
  lga: string;
  ward: string;
  status: string;
  address: string;
  phone_number: string;
}
export interface AuthState {
  me: MemberDto | null;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  errorMessage: string | null;
}
export const initialState: AuthState = {
  me: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "INIT_STORE":
      return action.payload;

    case "REQUEST_LOGIN":
      return { ...state, loading: true };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        me: action.payload.member,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error,
      };

    case "REQUEST_SIGNUP":
      return { ...state, loading: true };

    case "SIGNUP_SUCCESS":
      return {
        ...state,
        me: action.payload.member,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
      };

    case "SIGNUP_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error,
      };

    case "LOGOUT":
      return { ...state, me: null, accessToken: null, refreshToken: null };

    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};
