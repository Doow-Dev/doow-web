import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findAllVirtualAccountsThunk } from "./findAllVirtualAccountsThunk";
import { createNgnAccountsThunk } from "./createNgnAccountThunk";
import { IVirtualAccountState } from "./types";

const initialState: IVirtualAccountState = {
  data: null,
  newAccount: null,
  account: null,
  loading: false,
};

export const virtualAccountSlice = createSlice({
  name: "virtualAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllVirtualAccountsThunk.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(findAllVirtualAccountsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(findAllVirtualAccountsThunk.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createNgnAccountsThunk.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(createNgnAccountsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.newAccount = action.payload;
        state.account = {
          balance: "",
          accountName: action.payload.data.accountInformation.accountName,
          countryFlag: "/assets/flags/nigeria.png",
          profileUrls: ["/assets/profiles/afro-hair.jpeg"],
        };
      })
      .addCase(createNgnAccountsThunk.rejected, (state, _) => {
        state.loading = false;
      });
  },
});

export const {} = virtualAccountSlice.actions;
export default virtualAccountSlice.reducer;
