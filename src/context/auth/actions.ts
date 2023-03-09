import React from "react";
import {
  CreateMemberDocument,
  CreateMemberMutation,
  CreateMemberMutationVariables,
  MemberCreateInput,
  ValidateMemberDocument,
  ValidateMemberInput,
  ValidateMemberMutation,
  ValidateMemberMutationVariables
} from "../../generated/graphql";
import graphqlClient from "../../graphql/apollo";
import { ActionType, clearAuthState, storeAuthState } from "./authReducer";

export const signUp = async (
  dispatch: React.Dispatch<ActionType>,
  credentials: MemberCreateInput
) => {
  try {
    dispatch({ type: "REQUEST_SIGNUP" });

    const signupResponse = await graphqlClient.mutate<
      CreateMemberMutation,
      CreateMemberMutationVariables
    >({
      mutation: CreateMemberDocument,
      variables: { input: credentials },
    });

    // update state if signup is successful
    if (signupResponse?.data?.createMember?.member) {
      const authObj = signupResponse.data.createMember;

      dispatch({ type: "SIGNUP_SUCCESS", payload: { ...authObj } });

      storeAuthState(
        authObj.member,
        authObj.accessToken,
        authObj.refreshToken
      );
      return authObj;
    }
    dispatch({
      type: "SIGNUP_ERROR",
      payload: { error: signupResponse.errors[0].message },
    });
  } catch (error) {
    dispatch({ type: "SIGNUP_ERROR", payload: { error: error } });
  }
};

export const logMemberIn = async (
  dispatch: React.Dispatch<ActionType>,
  credentials: ValidateMemberInput
) => {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    const loginResponse = await graphqlClient.mutate<
      ValidateMemberMutation,
      ValidateMemberMutationVariables
    >({
      mutation: ValidateMemberDocument,
      variables: {
        input: credentials,
      },
    });
    if (loginResponse?.data.validateMember?.member) {
      const authObj = loginResponse.data.validateMember;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { ...authObj},
      });
      storeAuthState(
        authObj.member,
        authObj.accessToken,
        authObj.refreshToken
      );
      return authObj;
    }

    dispatch({
      type: "LOGIN_ERROR",
      payload: { error: loginResponse.errors[0].message },
    });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: { error } });
  }
};

export const logout = async (dispatch: React.Dispatch<ActionType>) => {
  dispatch({ type: "LOGOUT" });
  clearAuthState();
};



// export const ValidatePhoneNumber = async ({
//   to,
//   message,
// }: ValidatePhoneNumberInput) => {
//   try {
//     const response = await graphqlClient.mutate<
//       ValidatePhoneNumberMutation,
//       ValidatePhoneNumberMutationVariables
//     >({
//       mutation: ValidatePhoneNumberDocument,
//       variables: { input: { to, message } },
//     });

//     if (response?.data?.validatePhoneNumber) {
//       const resObj = response.data.validatePhoneNumber;
//       return resObj;
//     }
//     if (response?.errors) {
//       throw new Error(response?.errors[0].message);
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };
