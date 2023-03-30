import { createAsyncThunk } from "@reduxjs/toolkit";
import { ListMerchantVirtualAccountsInput } from "../../../graphql/generated/graphql";
import virtualAccountService from "../../services/virtualAccount";

export const findAllVirtualAccountsThunk = createAsyncThunk(
  "virtualAccount/findAll",
  (args: ListMerchantVirtualAccountsInput) => {
    return virtualAccountService.findAllVitualAccounts(args);
  }
);
