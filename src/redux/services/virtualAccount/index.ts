import apolloClient from "../../../constants/apollo-client";
import {
  CreateNigerianAccountDocument,
  CreateNigerianAccountInput,
  CreateNigerianAccountMutation,
  CreateNigerianAccountMutationVariables,
  FindAllVirtualAccountDocument,
  FindAllVirtualAccountQuery,
  FindAllVirtualAccountQueryVariables,
  ListMerchantVirtualAccountsInput,
} from "../../../graphql/generated/graphql";

class VirualAccountService {
  async findAllVitualAccounts(args: ListMerchantVirtualAccountsInput) {
    try {
      const response = await apolloClient.query<
        FindAllVirtualAccountQuery,
        FindAllVirtualAccountQueryVariables
      >({
        query: FindAllVirtualAccountDocument,
        variables: {
          input: args,
        },
      });


      if (!response || !response.data.findAllVirtualAccounts.data) {
        throw new Error(response.error.message);
      }

      return response.data.findAllVirtualAccounts.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createNgnAccount(args: CreateNigerianAccountInput) {
    try {
      const response = await apolloClient.mutate<
        CreateNigerianAccountMutation,
        CreateNigerianAccountMutationVariables
      >({
        mutation: CreateNigerianAccountDocument,
        variables: {
          input: args,
        },
      });

      if (!response || !response.data.createNgnAccount.data) {
        throw new Error(response.errors[0].message);
      }

      return response.data.createNgnAccount;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new VirualAccountService();
