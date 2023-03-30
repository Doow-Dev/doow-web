import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AccountInformation = {
  __typename?: 'AccountInformation';
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
};

export type AddressDto = {
  __typename?: 'AddressDto';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  city: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  countryOfResidence?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  state: Scalars['String'];
  street: Scalars['String'];
  zip?: InputMaybe<Scalars['String']>;
};

export type BusinessDetails = {
  businessRegistrationCountry?: InputMaybe<Scalars['String']>;
  businessRegistrationNumber?: InputMaybe<Scalars['String']>;
  companyType?: InputMaybe<Scalars['String']>;
  directorsName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  percentageShareHolding?: InputMaybe<Scalars['String']>;
  residentialAddress?: InputMaybe<Scalars['String']>;
  riskRating?: InputMaybe<Scalars['String']>;
  shareHoldersName?: InputMaybe<Scalars['String']>;
  tradingName?: InputMaybe<Scalars['String']>;
};

export type CreateInstantAccountsInput = {
  KYCInformation: ForiegnAccountKycInput;
  accountType?: InputMaybe<Scalars['String']>;
  businessId?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  meansOfId?: InputMaybe<Scalars['String']>;
  subAccountId?: InputMaybe<Scalars['String']>;
  utilityBill?: InputMaybe<Scalars['String']>;
};

export type CreateNigerianAccountInput = {
  KYCInformation: NigerianKycInput;
  accountType: Scalars['String'];
  currency: Scalars['String'];
};

export type CreatePersonalForeignAccountInput = {
  KYCInformation: ForiegnAccountKycInput;
  accountType: Scalars['String'];
  bankStatement?: InputMaybe<Scalars['String']>;
  currency: Scalars['String'];
  meansOfId?: InputMaybe<Scalars['String']>;
  utilityBill?: InputMaybe<Scalars['String']>;
};

export type CreateVirtualAccountInput = {
  KYCInformation: KycInput;
  accountType: Scalars['String'];
  attachments?: InputMaybe<Scalars['String']>;
  bankStatement?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  currency: Scalars['String'];
  entityName?: InputMaybe<Scalars['String']>;
  meansOfId?: InputMaybe<Array<Scalars['String']>>;
  monthlyVolume?: InputMaybe<Scalars['String']>;
  paymentFlowDescription?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  utilityBill?: InputMaybe<Scalars['String']>;
};

export type CreateVirtualAccountResponse = {
  __typename?: 'CreateVirtualAccountResponse';
  data?: Maybe<NigerianAccountResponse>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type FindVirtualAccountResponse = {
  __typename?: 'FindVirtualAccountResponse';
  data?: Maybe<VirtualAccountsResponse>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ForiegnAccountKycInput = {
  accountDesignation?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<AddressInput>;
  birthDate?: InputMaybe<Scalars['String']>;
  document?: InputMaybe<PayoutDocumentInput>;
  email?: InputMaybe<Scalars['String']>;
  employmentStatus?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  incomeBand?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  nationality?: InputMaybe<Scalars['String']>;
  occupation?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  sourceOfIncome?: InputMaybe<Scalars['String']>;
};

export type KycDto = {
  __typename?: 'KycDto';
  accountDesignation?: Maybe<Scalars['String']>;
  additionalInfo?: Maybe<Scalars['String']>;
  address?: Maybe<AddressDto>;
  birthDate?: Maybe<Scalars['String']>;
  businessCategory?: Maybe<Scalars['String']>;
  businessName?: Maybe<Scalars['String']>;
  bvn?: Maybe<Scalars['String']>;
  document?: Maybe<PayoutDocumentDto>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  occupation?: Maybe<Scalars['String']>;
};

export type KycInput = {
  accountDesignation?: InputMaybe<Scalars['String']>;
  additionalInfo?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<AddressInput>;
  birthDate?: InputMaybe<Scalars['String']>;
  businessCategory?: InputMaybe<Scalars['String']>;
  businessDetails?: InputMaybe<BusinessDetails>;
  businessName?: InputMaybe<Scalars['String']>;
  bvn?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  countryOfResidence?: InputMaybe<Scalars['String']>;
  document?: InputMaybe<PayoutDocumentInput>;
  email?: InputMaybe<Scalars['String']>;
  employmentStatus?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  incomeBand?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  nationality?: InputMaybe<Scalars['String']>;
  occupation?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  sourceOfIncome?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type ListMerchantVirtualAccountsInput = {
  accountNumber?: InputMaybe<Scalars['String']>;
  businessName?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  issuedDate?: InputMaybe<Scalars['String']>;
  requestedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCoporateForiegnAccount: CreateVirtualAccountResponse;
  createInstantVirtualAccounts: CreateVirtualAccountResponse;
  createNgnAccount: CreateVirtualAccountResponse;
  createPersonalForeignAccount: CreateVirtualAccountResponse;
};


export type MutationCreateCoporateForiegnAccountArgs = {
  input: CreateVirtualAccountInput;
};


export type MutationCreateInstantVirtualAccountsArgs = {
  input: CreateInstantAccountsInput;
};


export type MutationCreateNgnAccountArgs = {
  input: CreateNigerianAccountInput;
};


export type MutationCreatePersonalForeignAccountArgs = {
  input: CreatePersonalForeignAccountInput;
};

export type NigerianAccountResponse = {
  __typename?: 'NigerianAccountResponse';
  KYCInformation?: Maybe<KycDto>;
  _id?: Maybe<Scalars['String']>;
  accountInformation?: Maybe<AccountInformation>;
  accountNumber?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  attachments?: Maybe<Array<Scalars['String']>>;
  bankStatement?: Maybe<Array<Scalars['String']>>;
  business?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  currencyType?: Maybe<Scalars['String']>;
  entityName?: Maybe<Scalars['String']>;
  entityType?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isBankTransferVa?: Maybe<Scalars['Boolean']>;
  isCheckoutVa?: Maybe<Scalars['Boolean']>;
  isPermanent?: Maybe<Scalars['Boolean']>;
  isSuspended?: Maybe<Scalars['Boolean']>;
  meansOfId?: Maybe<Array<Scalars['String']>>;
  merchantReference?: Maybe<Scalars['String']>;
  monthlyVolume?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  paymentFlowDescription?: Maybe<Scalars['String']>;
  pendingAdditionalInfoCount?: Maybe<Scalars['Float']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  utilityBill?: Maybe<Array<Scalars['String']>>;
  verifiedKYCData?: Maybe<Scalars['String']>;
  virtualAccountType?: Maybe<Scalars['String']>;
};

export type NigerianKycInput = {
  businessName?: InputMaybe<Scalars['String']>;
  bvn?: InputMaybe<Scalars['String']>;
};

export type PayoutDocumentDto = {
  __typename?: 'PayoutDocumentDto';
  expirationDate?: Maybe<Scalars['String']>;
  issuedBy?: Maybe<Scalars['String']>;
  issuedCountryCode?: Maybe<Scalars['String']>;
  issuedDate?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type PayoutDocumentInput = {
  expirationDate: Scalars['String'];
  issuedBy: Scalars['String'];
  issuedCountryCode: Scalars['String'];
  issuedDate: Scalars['String'];
  number: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findAllVirtualAccounts: FindVirtualAccountResponse;
  findOneVirtualAccounts: FindVirtualAccountResponse;
};


export type QueryFindAllVirtualAccountsArgs = {
  input: ListMerchantVirtualAccountsInput;
};


export type QueryFindOneVirtualAccountsArgs = {
  input: FindOneInput;
};

export type VirtualAccountsResponse = {
  __typename?: 'VirtualAccountsResponse';
  results?: Maybe<Array<NigerianAccountResponse>>;
  total?: Maybe<Scalars['Float']>;
};

export type FindOneInput = {
  id: Scalars['String'];
};

export type CreateNigerianAccountMutationVariables = Exact<{
  input: CreateNigerianAccountInput;
}>;


export type CreateNigerianAccountMutation = { __typename?: 'Mutation', createNgnAccount: { __typename?: 'CreateVirtualAccountResponse', success?: boolean | null, message?: string | null, data?: { __typename?: 'NigerianAccountResponse', _id?: string | null, currency?: string | null, currencyType?: string | null, status?: string | null, reason?: string | null, expiresAt?: any | null, createdAt?: string | null, attachments?: Array<string> | null, isCheckoutVa?: boolean | null, accountNumber?: string | null, virtualAccountType?: string | null, merchantReference?: string | null, paymentFlowDescription?: string | null, KYCInformation?: { __typename?: 'KycDto', firstName?: string | null, lastName?: string | null, email?: string | null, occupation?: string | null, additionalInfo?: string | null } | null, accountInformation?: { __typename?: 'AccountInformation', accountName?: string | null, accountNumber?: string | null, bankName?: string | null, reference?: string | null } | null } | null } };

export type FindAllVirtualAccountQueryVariables = Exact<{
  input: ListMerchantVirtualAccountsInput;
}>;


export type FindAllVirtualAccountQuery = { __typename?: 'Query', findAllVirtualAccounts: { __typename?: 'FindVirtualAccountResponse', data?: { __typename?: 'VirtualAccountsResponse', results?: Array<{ __typename?: 'NigerianAccountResponse', status?: string | null, isActive?: boolean | null, accountNumber?: string | null, merchantReference?: string | null, KYCInformation?: { __typename?: 'KycDto', firstName?: string | null, lastName?: string | null, email?: string | null, businessName?: string | null, bvn?: string | null, birthDate?: string | null, occupation?: string | null, businessCategory?: string | null, accountDesignation?: string | null, address?: { __typename?: 'AddressDto', country?: string | null, zip?: string | null, street?: string | null, state?: string | null } | null } | null }> | null } | null } };


export const CreateNigerianAccountDocument = gql`
    mutation CreateNigerianAccount($input: CreateNigerianAccountInput!) {
  createNgnAccount(input: $input) {
    success
    message
    data {
      _id
      currency
      currencyType
      status
      reason
      expiresAt
      createdAt
      currencyType
      attachments
      isCheckoutVa
      accountNumber
      virtualAccountType
      KYCInformation {
        firstName
        lastName
        email
        occupation
        additionalInfo
      }
      merchantReference
      paymentFlowDescription
      accountInformation {
        accountName
        accountNumber
        bankName
        reference
      }
    }
  }
}
    `;
export type CreateNigerianAccountMutationFn = Apollo.MutationFunction<CreateNigerianAccountMutation, CreateNigerianAccountMutationVariables>;

/**
 * __useCreateNigerianAccountMutation__
 *
 * To run a mutation, you first call `useCreateNigerianAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNigerianAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNigerianAccountMutation, { data, loading, error }] = useCreateNigerianAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNigerianAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateNigerianAccountMutation, CreateNigerianAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNigerianAccountMutation, CreateNigerianAccountMutationVariables>(CreateNigerianAccountDocument, options);
      }
export type CreateNigerianAccountMutationHookResult = ReturnType<typeof useCreateNigerianAccountMutation>;
export type CreateNigerianAccountMutationResult = Apollo.MutationResult<CreateNigerianAccountMutation>;
export type CreateNigerianAccountMutationOptions = Apollo.BaseMutationOptions<CreateNigerianAccountMutation, CreateNigerianAccountMutationVariables>;
export const FindAllVirtualAccountDocument = gql`
    query FindAllVirtualAccount($input: ListMerchantVirtualAccountsInput!) {
  findAllVirtualAccounts(input: $input) {
    data {
      results {
        status
        isActive
        accountNumber
        merchantReference
        KYCInformation {
          firstName
          lastName
          email
          businessName
          bvn
          birthDate
          occupation
          businessCategory
          accountDesignation
          address {
            country
            zip
            street
            state
          }
        }
        isActive
      }
    }
  }
}
    `;

/**
 * __useFindAllVirtualAccountQuery__
 *
 * To run a query within a React component, call `useFindAllVirtualAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllVirtualAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllVirtualAccountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAllVirtualAccountQuery(baseOptions: Apollo.QueryHookOptions<FindAllVirtualAccountQuery, FindAllVirtualAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllVirtualAccountQuery, FindAllVirtualAccountQueryVariables>(FindAllVirtualAccountDocument, options);
      }
export function useFindAllVirtualAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllVirtualAccountQuery, FindAllVirtualAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllVirtualAccountQuery, FindAllVirtualAccountQueryVariables>(FindAllVirtualAccountDocument, options);
        }
export type FindAllVirtualAccountQueryHookResult = ReturnType<typeof useFindAllVirtualAccountQuery>;
export type FindAllVirtualAccountLazyQueryHookResult = ReturnType<typeof useFindAllVirtualAccountLazyQuery>;
export type FindAllVirtualAccountQueryResult = Apollo.QueryResult<FindAllVirtualAccountQuery, FindAllVirtualAccountQueryVariables>;