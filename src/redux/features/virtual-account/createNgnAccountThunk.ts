import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateNigerianAccountInput } from "../../../graphql/generated/graphql";
import virtualAccountService from "../../services/virtualAccount";

export const createNgnAccountsThunk = createAsyncThunk(
  "virtualAccount/createNgnAccount",
  (input: {args: CreateNigerianAccountInput, alias: string}) => {
    return virtualAccountService.createNgnAccount(input);
  }
);