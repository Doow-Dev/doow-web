import {
  CreateVirtualAccountResponse,
  FindVirtualAccountResponse,
} from "../../../graphql/generated/graphql";

export interface IVirtualAccountState {
  data: FindVirtualAccountResponse["data"] | null;
  newAccount: CreateVirtualAccountResponse | null;
  account: {
    accountName: string | null;
    balance: string | "";
    countryFlag: string | "";
    profileUrls: string[] | null;
  } | null;
  loading: boolean;
}
