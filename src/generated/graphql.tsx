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

export type BankAvgAggregate = {
  __typename?: 'BankAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type BankCountAggregate = {
  __typename?: 'BankCountAggregate';
  _all: Scalars['Int'];
  created_at: Scalars['Int'];
  id: Scalars['Int'];
  logo: Scalars['Int'];
  name: Scalars['Int'];
  updated_at: Scalars['Int'];
};

export type BankMaxAggregate = {
  __typename?: 'BankMaxAggregate';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type BankMinAggregate = {
  __typename?: 'BankMinAggregate';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type BankSumAggregate = {
  __typename?: 'BankSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BoolFilter>;
};

export type CreateWardInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DonationsAvgAggregate = {
  __typename?: 'DonationsAvgAggregate';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

export type DonationsCountAggregate = {
  __typename?: 'DonationsCountAggregate';
  _all: Scalars['Int'];
  amount: Scalars['Int'];
  created_at: Scalars['Int'];
  id: Scalars['Int'];
  reason: Scalars['Int'];
  updated_at: Scalars['Int'];
  user_id: Scalars['Int'];
};

export type DonationsMaxAggregate = {
  __typename?: 'DonationsMaxAggregate';
  amount?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type DonationsMinAggregate = {
  __typename?: 'DonationsMinAggregate';
  amount?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type DonationsSumAggregate = {
  __typename?: 'DonationsSumAggregate';
  amount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type Enrollment = {
  __typename?: 'Enrollment';
  bank?: Maybe<Scalars['String']>;
  branch?: Maybe<Scalars['String']>;
  registration_date?: Maybe<Scalars['String']>;
};

export type EnumMarital_StatusFilter = {
  equals?: InputMaybe<Marital_Status>;
  in?: InputMaybe<Array<Marital_Status>>;
  not?: InputMaybe<EnumMarital_StatusFilter>;
  notIn?: InputMaybe<Array<Marital_Status>>;
};

export type EnumMember_TypeFilter = {
  equals?: InputMaybe<Member_Type>;
  in?: InputMaybe<Array<Member_Type>>;
  not?: InputMaybe<EnumMember_TypeFilter>;
  notIn?: InputMaybe<Array<Member_Type>>;
};

export type Fed_ConstAvgAggregate = {
  __typename?: 'Fed_constAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

export type Fed_ConstCount = {
  __typename?: 'Fed_constCount';
  lga: Scalars['Int'];
};

export type Fed_ConstCountAggregate = {
  __typename?: 'Fed_constCountAggregate';
  _all: Scalars['Int'];
  code: Scalars['Int'];
  created_at: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at: Scalars['Int'];
};

export type Fed_ConstListRelationFilter = {
  every?: InputMaybe<Fed_ConstWhereInput>;
  none?: InputMaybe<Fed_ConstWhereInput>;
  some?: InputMaybe<Fed_ConstWhereInput>;
};

export type Fed_ConstMaxAggregate = {
  __typename?: 'Fed_constMaxAggregate';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Fed_ConstMinAggregate = {
  __typename?: 'Fed_constMinAggregate';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Fed_ConstRelationFilter = {
  is?: InputMaybe<Fed_ConstWhereInput>;
  isNot?: InputMaybe<Fed_ConstWhereInput>;
};

export type Fed_ConstSumAggregate = {
  __typename?: 'Fed_constSumAggregate';
  id?: Maybe<Scalars['Int']>;
  state_id?: Maybe<Scalars['Int']>;
};

export type FindLgaInput = {
  cursor?: InputMaybe<LgaWhereUniqueInput>;
  distinct?: InputMaybe<Array<LgaScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<LgaOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LgaWhereInput>;
};

export type FindStateInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  state_code?: InputMaybe<Scalars['String']>;
};

export type FindWardInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  latitude?: InputMaybe<Scalars['String']>;
  lga_id?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  state_id?: InputMaybe<Scalars['Float']>;
};

export type FindmembersFilter = {
  cursor?: InputMaybe<MemberWhereUniqueInput>;
  distinct?: InputMaybe<Array<MemberScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MemberOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MemberWhereInput>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type LgaAvgAggregate = {
  __typename?: 'LgaAvgAggregate';
  fed_const_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  senatorial_id?: Maybe<Scalars['Float']>;
  state_const_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

export type LgaCount = {
  __typename?: 'LgaCount';
  pu: Scalars['Int'];
  wards: Scalars['Int'];
};

export type LgaCountAggregate = {
  __typename?: 'LgaCountAggregate';
  _all: Scalars['Int'];
  chatroom_id: Scalars['Int'];
  code: Scalars['Int'];
  created_at: Scalars['Int'];
  fed_const_id: Scalars['Int'];
  id: Scalars['Int'];
  latitude: Scalars['Int'];
  longitude: Scalars['Int'];
  name: Scalars['Int'];
  senatorial_id: Scalars['Int'];
  state_const_id: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at: Scalars['Int'];
};

export type LgaListRelationFilter = {
  every?: InputMaybe<LgaWhereInput>;
  none?: InputMaybe<LgaWhereInput>;
  some?: InputMaybe<LgaWhereInput>;
};

export type LgaMaxAggregate = {
  __typename?: 'LgaMaxAggregate';
  chatroom_id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  fed_const_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  senatorial_id?: Maybe<Scalars['Int']>;
  state_const_id?: Maybe<Scalars['Int']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type LgaMinAggregate = {
  __typename?: 'LgaMinAggregate';
  chatroom_id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  fed_const_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  senatorial_id?: Maybe<Scalars['Int']>;
  state_const_id?: Maybe<Scalars['Int']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type LgaRelationFilter = {
  is?: InputMaybe<LgaWhereInput>;
  isNot?: InputMaybe<LgaWhereInput>;
};

export enum LgaScalarFieldEnum {
  ChatroomId = 'chatroom_id',
  Code = 'code',
  CreatedAt = 'created_at',
  FedConstId = 'fed_const_id',
  Id = 'id',
  Latitude = 'latitude',
  Longitude = 'longitude',
  Name = 'name',
  SenatorialId = 'senatorial_id',
  StateConstId = 'state_const_id',
  StateId = 'state_id',
  UpdatedAt = 'updated_at'
}

export type LgaSumAggregate = {
  __typename?: 'LgaSumAggregate';
  fed_const_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  senatorial_id?: Maybe<Scalars['Int']>;
  state_const_id?: Maybe<Scalars['Int']>;
  state_id?: Maybe<Scalars['Int']>;
};

export enum Marital_Status {
  Married = 'MARRIED',
  Single = 'SINGLE'
}

export enum Member_Type {
  Finance = 'FINANCE',
  Lga = 'LGA',
  National = 'NATIONAL',
  Regular = 'REGULAR',
  State = 'STATE',
  Ward = 'WARD'
}

export type MemberAvgAggregate = {
  __typename?: 'MemberAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  lga_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
  ward_id?: Maybe<Scalars['Float']>;
};

export type MemberCountAggregate = {
  __typename?: 'MemberCountAggregate';
  _all: Scalars['Int'];
  address: Scalars['Int'];
  alt_phone: Scalars['Int'];
  created_at: Scalars['Int'];
  dob: Scalars['Int'];
  email: Scalars['Int'];
  first_name: Scalars['Int'];
  id: Scalars['Int'];
  is_a_candidate: Scalars['Int'];
  is_a_delegate: Scalars['Int'];
  is_an_agent: Scalars['Int'];
  is_an_aspirant: Scalars['Int'];
  is_candidate: Scalars['Int'];
  is_p_appointed: Scalars['Int'];
  is_p_elected: Scalars['Int'];
  last_name: Scalars['Int'];
  lga_id: Scalars['Int'];
  marital_status: Scalars['Int'];
  member_type: Scalars['Int'];
  middle_name: Scalars['Int'];
  nin: Scalars['Int'];
  occupation: Scalars['Int'];
  password: Scalars['Int'];
  phone: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at: Scalars['Int'];
  vin: Scalars['Int'];
  ward_id: Scalars['Int'];
};

export type MemberDto = {
  __typename?: 'MemberDto';
  address?: Maybe<Scalars['String']>;
  alt_phone?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  lga_id?: Maybe<Scalars['String']>;
  marital_status?: Maybe<Scalars['String']>;
  member_type?: Maybe<Scalars['String']>;
  middle_name?: Maybe<Scalars['String']>;
  nin?: Maybe<Scalars['String']>;
  occupation?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  vin?: Maybe<Scalars['String']>;
  ward_id?: Maybe<Scalars['String']>;
};

export type MemberMaxAggregate = {
  __typename?: 'MemberMaxAggregate';
  address?: Maybe<Scalars['String']>;
  alt_phone?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  is_a_candidate?: Maybe<Scalars['Boolean']>;
  is_a_delegate?: Maybe<Scalars['Boolean']>;
  is_an_agent?: Maybe<Scalars['Boolean']>;
  is_an_aspirant?: Maybe<Scalars['Boolean']>;
  is_candidate?: Maybe<Scalars['Boolean']>;
  is_p_appointed?: Maybe<Scalars['Boolean']>;
  is_p_elected?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  lga_id?: Maybe<Scalars['Int']>;
  marital_status?: Maybe<Marital_Status>;
  member_type?: Maybe<Member_Type>;
  middle_name?: Maybe<Scalars['String']>;
  nin?: Maybe<Scalars['String']>;
  occupation?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  vin?: Maybe<Scalars['String']>;
  ward_id?: Maybe<Scalars['Int']>;
};

export type MemberMinAggregate = {
  __typename?: 'MemberMinAggregate';
  address?: Maybe<Scalars['String']>;
  alt_phone?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  is_a_candidate?: Maybe<Scalars['Boolean']>;
  is_a_delegate?: Maybe<Scalars['Boolean']>;
  is_an_agent?: Maybe<Scalars['Boolean']>;
  is_an_aspirant?: Maybe<Scalars['Boolean']>;
  is_candidate?: Maybe<Scalars['Boolean']>;
  is_p_appointed?: Maybe<Scalars['Boolean']>;
  is_p_elected?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  lga_id?: Maybe<Scalars['Int']>;
  marital_status?: Maybe<Marital_Status>;
  member_type?: Maybe<Member_Type>;
  middle_name?: Maybe<Scalars['String']>;
  nin?: Maybe<Scalars['String']>;
  occupation?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  vin?: Maybe<Scalars['String']>;
  ward_id?: Maybe<Scalars['Int']>;
};

export enum MemberScalarFieldEnum {
  Address = 'address',
  AltPhone = 'alt_phone',
  CreatedAt = 'created_at',
  Dob = 'dob',
  Email = 'email',
  FirstName = 'first_name',
  Id = 'id',
  IsACandidate = 'is_a_candidate',
  IsADelegate = 'is_a_delegate',
  IsAnAgent = 'is_an_agent',
  IsAnAspirant = 'is_an_aspirant',
  IsCandidate = 'is_candidate',
  IsPAppointed = 'is_p_appointed',
  IsPElected = 'is_p_elected',
  LastName = 'last_name',
  LgaId = 'lga_id',
  MaritalStatus = 'marital_status',
  MemberType = 'member_type',
  MiddleName = 'middle_name',
  Nin = 'nin',
  Occupation = 'occupation',
  Password = 'password',
  Phone = 'phone',
  StateId = 'state_id',
  UpdatedAt = 'updated_at',
  Vin = 'vin',
  WardId = 'ward_id'
}

export type MemberSumAggregate = {
  __typename?: 'MemberSumAggregate';
  id?: Maybe<Scalars['Int']>;
  lga_id?: Maybe<Scalars['Int']>;
  state_id?: Maybe<Scalars['Int']>;
  ward_id?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMember: ValidateMemberResponse;
  createWard: Ward;
  removeMember: MemberDto;
  removeWard: Ward;
  updateMember: MemberDto;
  updateWard: Ward;
  validateMember: ValidateMemberResponse;
  validatePhoneNumber: SendOtpResponseDto;
};


export type MutationCreateMemberArgs = {
  input: MemberCreateInput;
};


export type MutationCreateWardArgs = {
  createWardInput: CreateWardInput;
};


export type MutationRemoveMemberArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveWardArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateMemberArgs = {
  input: UpdateMemberInput;
};


export type MutationUpdateWardArgs = {
  updateWardInput: UpdateWardInput;
};


export type MutationValidateMemberArgs = {
  input: ValidateMemberInput;
};


export type MutationValidatePhoneNumberArgs = {
  input: ValidatePhoneNumberInput;
};

export type PuAvgAggregate = {
  __typename?: 'PuAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  lga_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
  ward_id?: Maybe<Scalars['Float']>;
};

export type PuCountAggregate = {
  __typename?: 'PuCountAggregate';
  _all: Scalars['Int'];
  code: Scalars['Int'];
  created_at: Scalars['Int'];
  id: Scalars['Int'];
  lga_id: Scalars['Int'];
  name: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at: Scalars['Int'];
  ward_id: Scalars['Int'];
};

export type PuListRelationFilter = {
  every?: InputMaybe<PuWhereInput>;
  none?: InputMaybe<PuWhereInput>;
  some?: InputMaybe<PuWhereInput>;
};

export type PuMaxAggregate = {
  __typename?: 'PuMaxAggregate';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  lga_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  ward_id?: Maybe<Scalars['Int']>;
};

export type PuMinAggregate = {
  __typename?: 'PuMinAggregate';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  lga_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  ward_id?: Maybe<Scalars['Int']>;
};

export type PuSumAggregate = {
  __typename?: 'PuSumAggregate';
  id?: Maybe<Scalars['Int']>;
  lga_id?: Maybe<Scalars['Int']>;
  state_id?: Maybe<Scalars['Int']>;
  ward_id?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  findAllLga: Array<Lga>;
  findAllMembers: Array<MemberDto>;
  findAllStates: Array<State>;
  findAllWards: Array<Ward>;
  findOneLga: Lga;
  findOneMember: MemberDto;
  findOneState: State;
  updateLga: Lga;
  verifyBvn: VerifyNinResponse;
  verifyNin: VerifyNinResponse;
  ward: Ward;
};


export type QueryFindAllLgaArgs = {
  input: FindLgaInput;
};


export type QueryFindAllMembersArgs = {
  filter: FindmembersFilter;
};


export type QueryFindAllStatesArgs = {
  input: FindStateInput;
};


export type QueryFindAllWardsArgs = {
  input: FindWardInput;
};


export type QueryFindOneLgaArgs = {
  id: Scalars['Int'];
};


export type QueryFindOneMemberArgs = {
  id: Scalars['Int'];
};


export type QueryFindOneStateArgs = {
  id: Scalars['Int'];
};


export type QueryUpdateLgaArgs = {
  input: UpdateLgaInput;
};


export type QueryVerifyBvnArgs = {
  input: VerifyBvnInput;
};


export type QueryVerifyNinArgs = {
  input: VerifyNinInput;
};


export type QueryWardArgs = {
  id: Scalars['Int'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Senatorial_DistrictAvgAggregate = {
  __typename?: 'Senatorial_districtAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

export type Senatorial_DistrictCount = {
  __typename?: 'Senatorial_districtCount';
  lga: Scalars['Int'];
};

export type Senatorial_DistrictCountAggregate = {
  __typename?: 'Senatorial_districtCountAggregate';
  _all: Scalars['Int'];
  created_at: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at: Scalars['Int'];
};

export type Senatorial_DistrictMaxAggregate = {
  __typename?: 'Senatorial_districtMaxAggregate';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Senatorial_DistrictMinAggregate = {
  __typename?: 'Senatorial_districtMinAggregate';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Senatorial_DistrictRelationFilter = {
  is?: InputMaybe<Senatorial_DistrictWhereInput>;
  isNot?: InputMaybe<Senatorial_DistrictWhereInput>;
};

export type Senatorial_DistrictSumAggregate = {
  __typename?: 'Senatorial_districtSumAggregate';
  id?: Maybe<Scalars['Int']>;
  state_id?: Maybe<Scalars['Int']>;
};

export type SendOtpResponseDto = {
  __typename?: 'SendOtpResponseDto';
  message?: Maybe<Scalars['String']>;
  otp: Scalars['String'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StateAvgAggregate = {
  __typename?: 'StateAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type StateCount = {
  __typename?: 'StateCount';
  fed_const: Scalars['Int'];
  lgas: Scalars['Int'];
  pu: Scalars['Int'];
  state_consts: Scalars['Int'];
  wards: Scalars['Int'];
};

export type StateCountAggregate = {
  __typename?: 'StateCountAggregate';
  _all: Scalars['Int'];
  capital: Scalars['Int'];
  chatroom_id: Scalars['Int'];
  created_at: Scalars['Int'];
  id: Scalars['Int'];
  latitude: Scalars['Int'];
  longitude: Scalars['Int'];
  name: Scalars['Int'];
  state_code: Scalars['Int'];
  updated_at: Scalars['Int'];
};

export type StateMaxAggregate = {
  __typename?: 'StateMaxAggregate';
  capital?: Maybe<Scalars['String']>;
  chatroom_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  state_code?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type StateMinAggregate = {
  __typename?: 'StateMinAggregate';
  capital?: Maybe<Scalars['String']>;
  chatroom_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  state_code?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type StateRelationFilter = {
  is?: InputMaybe<StateWhereInput>;
  isNot?: InputMaybe<StateWhereInput>;
};

export type StateSumAggregate = {
  __typename?: 'StateSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type State_ConstAvgAggregate = {
  __typename?: 'State_constAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

export type State_ConstCount = {
  __typename?: 'State_constCount';
  lga: Scalars['Int'];
};

export type State_ConstCountAggregate = {
  __typename?: 'State_constCountAggregate';
  _all: Scalars['Int'];
  code: Scalars['Int'];
  created_at: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at: Scalars['Int'];
};

export type State_ConstListRelationFilter = {
  every?: InputMaybe<State_ConstWhereInput>;
  none?: InputMaybe<State_ConstWhereInput>;
  some?: InputMaybe<State_ConstWhereInput>;
};

export type State_ConstMaxAggregate = {
  __typename?: 'State_constMaxAggregate';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type State_ConstMinAggregate = {
  __typename?: 'State_constMinAggregate';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type State_ConstRelationFilter = {
  is?: InputMaybe<State_ConstWhereInput>;
  isNot?: InputMaybe<State_ConstWhereInput>;
};

export type State_ConstSumAggregate = {
  __typename?: 'State_constSumAggregate';
  id?: Maybe<Scalars['Int']>;
  state_id?: Maybe<Scalars['Int']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UpdateLgaInput = {
  data: LgaUpdateInput;
  id: LgaWhereInput;
};

export type UpdateMemberInput = {
  data: MemberCreateInput;
  id: Scalars['Float'];
};

export type UpdateWardInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type ValidateMemberInput = {
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type ValidateMemberResponse = {
  __typename?: 'ValidateMemberResponse';
  accessToken?: Maybe<Scalars['String']>;
  member?: Maybe<MemberDto>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type ValidatePhoneNumberInput = {
  message?: InputMaybe<Scalars['String']>;
  to: Scalars['String'];
};

export type VerifyBvnInput = {
  bvn: Scalars['String'];
};

export type VerifyNinInput = {
  nin: Scalars['String'];
};

export type VerifyNinResponse = {
  __typename?: 'VerifyNinResponse';
  _id?: Maybe<Scalars['String']>;
  bvn?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  enrollment?: Maybe<Enrollment>;
  env?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  is_bvn_verified?: Maybe<Scalars['Boolean']>;
  lastname?: Maybe<Scalars['String']>;
  lga_of_origin?: Maybe<Scalars['String']>;
  lga_of_residence?: Maybe<Scalars['String']>;
  marital_status?: Maybe<Scalars['String']>;
  middlename?: Maybe<Scalars['String']>;
  nationality?: Maybe<Scalars['String']>;
  nin?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state_of_origin?: Maybe<Scalars['String']>;
  state_of_residence?: Maybe<Scalars['String']>;
  verification_country?: Maybe<Scalars['String']>;
};

export type WardAvgAggregate = {
  __typename?: 'WardAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  lga_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

export type WardCount = {
  __typename?: 'WardCount';
  pu: Scalars['Int'];
};

export type WardCountAggregate = {
  __typename?: 'WardCountAggregate';
  _all: Scalars['Int'];
  chatroom_id: Scalars['Int'];
  code: Scalars['Int'];
  created_at: Scalars['Int'];
  id: Scalars['Int'];
  latitude: Scalars['Int'];
  lga_id: Scalars['Int'];
  longitude: Scalars['Int'];
  name: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at: Scalars['Int'];
};

export type WardListRelationFilter = {
  every?: InputMaybe<WardWhereInput>;
  none?: InputMaybe<WardWhereInput>;
  some?: InputMaybe<WardWhereInput>;
};

export type WardMaxAggregate = {
  __typename?: 'WardMaxAggregate';
  chatroom_id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['String']>;
  lga_id?: Maybe<Scalars['Int']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type WardMinAggregate = {
  __typename?: 'WardMinAggregate';
  chatroom_id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['String']>;
  lga_id?: Maybe<Scalars['Int']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type WardRelationFilter = {
  is?: InputMaybe<WardWhereInput>;
  isNot?: InputMaybe<WardWhereInput>;
};

export type WardSumAggregate = {
  __typename?: 'WardSumAggregate';
  id?: Maybe<Scalars['Int']>;
  lga_id?: Maybe<Scalars['Int']>;
  state_id?: Maybe<Scalars['Int']>;
};

export type Fed_Const = {
  __typename?: 'fed_const';
  _count: Fed_ConstCount;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  lga?: Maybe<Array<Lga>>;
  name: Scalars['String'];
  state: State;
  state_id: Scalars['Int'];
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Fed_ConstCreateManyStateInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type Fed_ConstCreateManyStateInputEnvelope = {
  data: Array<Fed_ConstCreateManyStateInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type Fed_ConstCreateNestedManyWithoutStateInput = {
  connect?: InputMaybe<Array<Fed_ConstWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<Fed_ConstCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<Fed_ConstCreateWithoutStateInput>>;
  createMany?: InputMaybe<Fed_ConstCreateManyStateInputEnvelope>;
};

export type Fed_ConstCreateNestedOneWithoutLgaInput = {
  connect?: InputMaybe<Fed_ConstWhereUniqueInput>;
  connectOrCreate?: InputMaybe<Fed_ConstCreateOrConnectWithoutLgaInput>;
  create?: InputMaybe<Fed_ConstCreateWithoutLgaInput>;
};

export type Fed_ConstCreateOrConnectWithoutLgaInput = {
  create: Fed_ConstCreateWithoutLgaInput;
  where: Fed_ConstWhereUniqueInput;
};

export type Fed_ConstCreateOrConnectWithoutStateInput = {
  create: Fed_ConstCreateWithoutStateInput;
  where: Fed_ConstWhereUniqueInput;
};

export type Fed_ConstCreateWithoutLgaInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  state: StateCreateNestedOneWithoutFed_ConstInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type Fed_ConstCreateWithoutStateInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  lga?: InputMaybe<LgaCreateNestedManyWithoutFed_ConstInput>;
  name: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type Fed_ConstOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Fed_ConstOrderByWithRelationInput = {
  code?: InputMaybe<SortOrder>;
  created_at?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lga?: InputMaybe<LgaOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  state?: InputMaybe<StateOrderByWithRelationInput>;
  state_id?: InputMaybe<SortOrder>;
  updated_at?: InputMaybe<SortOrder>;
};

export type Fed_ConstScalarWhereInput = {
  AND?: InputMaybe<Array<Fed_ConstScalarWhereInput>>;
  NOT?: InputMaybe<Array<Fed_ConstScalarWhereInput>>;
  OR?: InputMaybe<Array<Fed_ConstScalarWhereInput>>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Fed_ConstUpdateManyMutationInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type Fed_ConstUpdateManyWithWhereWithoutStateInput = {
  data: Fed_ConstUpdateManyMutationInput;
  where: Fed_ConstScalarWhereInput;
};

export type Fed_ConstUpdateManyWithoutStateNestedInput = {
  connect?: InputMaybe<Array<Fed_ConstWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<Fed_ConstCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<Fed_ConstCreateWithoutStateInput>>;
  createMany?: InputMaybe<Fed_ConstCreateManyStateInputEnvelope>;
  delete?: InputMaybe<Array<Fed_ConstWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<Fed_ConstScalarWhereInput>>;
  disconnect?: InputMaybe<Array<Fed_ConstWhereUniqueInput>>;
  set?: InputMaybe<Array<Fed_ConstWhereUniqueInput>>;
  update?: InputMaybe<Array<Fed_ConstUpdateWithWhereUniqueWithoutStateInput>>;
  updateMany?: InputMaybe<Array<Fed_ConstUpdateManyWithWhereWithoutStateInput>>;
  upsert?: InputMaybe<Array<Fed_ConstUpsertWithWhereUniqueWithoutStateInput>>;
};

export type Fed_ConstUpdateOneRequiredWithoutLgaNestedInput = {
  connect?: InputMaybe<Fed_ConstWhereUniqueInput>;
  connectOrCreate?: InputMaybe<Fed_ConstCreateOrConnectWithoutLgaInput>;
  create?: InputMaybe<Fed_ConstCreateWithoutLgaInput>;
  update?: InputMaybe<Fed_ConstUpdateWithoutLgaInput>;
  upsert?: InputMaybe<Fed_ConstUpsertWithoutLgaInput>;
};

export type Fed_ConstUpdateWithWhereUniqueWithoutStateInput = {
  data: Fed_ConstUpdateWithoutStateInput;
  where: Fed_ConstWhereUniqueInput;
};

export type Fed_ConstUpdateWithoutLgaInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutFed_ConstNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type Fed_ConstUpdateWithoutStateInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  lga?: InputMaybe<LgaUpdateManyWithoutFed_ConstNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type Fed_ConstUpsertWithWhereUniqueWithoutStateInput = {
  create: Fed_ConstCreateWithoutStateInput;
  update: Fed_ConstUpdateWithoutStateInput;
  where: Fed_ConstWhereUniqueInput;
};

export type Fed_ConstUpsertWithoutLgaInput = {
  create: Fed_ConstCreateWithoutLgaInput;
  update: Fed_ConstUpdateWithoutLgaInput;
};

export type Fed_ConstWhereInput = {
  AND?: InputMaybe<Array<Fed_ConstWhereInput>>;
  NOT?: InputMaybe<Array<Fed_ConstWhereInput>>;
  OR?: InputMaybe<Array<Fed_ConstWhereInput>>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  lga?: InputMaybe<LgaListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  state?: InputMaybe<StateRelationFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Fed_ConstWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Lga = {
  __typename?: 'lga';
  _count: LgaCount;
  chatroom_id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  fed_const: Fed_Const;
  fed_const_id: Scalars['Int'];
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  pu?: Maybe<Array<Pu>>;
  senatorial_district: Senatorial_District;
  senatorial_id: Scalars['Int'];
  state: State;
  state_const: State_Const;
  state_const_id: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at?: Maybe<Scalars['DateTime']>;
  wards?: Maybe<Array<Ward>>;
};

export type LgaCreateManyFed_ConstInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  senatorial_id: Scalars['Int'];
  state_const_id: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type LgaCreateManyFed_ConstInputEnvelope = {
  data: Array<LgaCreateManyFed_ConstInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LgaCreateManyStateInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const_id: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  senatorial_id: Scalars['Int'];
  state_const_id: Scalars['Int'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type LgaCreateManyStateInputEnvelope = {
  data: Array<LgaCreateManyStateInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LgaCreateManyState_ConstInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const_id: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  senatorial_id: Scalars['Int'];
  state_id: Scalars['Int'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type LgaCreateManyState_ConstInputEnvelope = {
  data: Array<LgaCreateManyState_ConstInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LgaCreateNestedManyWithoutFed_ConstInput = {
  connect?: InputMaybe<Array<LgaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LgaCreateOrConnectWithoutFed_ConstInput>>;
  create?: InputMaybe<Array<LgaCreateWithoutFed_ConstInput>>;
  createMany?: InputMaybe<LgaCreateManyFed_ConstInputEnvelope>;
};

export type LgaCreateNestedManyWithoutStateInput = {
  connect?: InputMaybe<Array<LgaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LgaCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<LgaCreateWithoutStateInput>>;
  createMany?: InputMaybe<LgaCreateManyStateInputEnvelope>;
};

export type LgaCreateNestedManyWithoutState_ConstInput = {
  connect?: InputMaybe<Array<LgaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LgaCreateOrConnectWithoutState_ConstInput>>;
  create?: InputMaybe<Array<LgaCreateWithoutState_ConstInput>>;
  createMany?: InputMaybe<LgaCreateManyState_ConstInputEnvelope>;
};

export type LgaCreateNestedOneWithoutPuInput = {
  connect?: InputMaybe<LgaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LgaCreateOrConnectWithoutPuInput>;
  create?: InputMaybe<LgaCreateWithoutPuInput>;
};

export type LgaCreateNestedOneWithoutWardsInput = {
  connect?: InputMaybe<LgaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LgaCreateOrConnectWithoutWardsInput>;
  create?: InputMaybe<LgaCreateWithoutWardsInput>;
};

export type LgaCreateOrConnectWithoutFed_ConstInput = {
  create: LgaCreateWithoutFed_ConstInput;
  where: LgaWhereUniqueInput;
};

export type LgaCreateOrConnectWithoutPuInput = {
  create: LgaCreateWithoutPuInput;
  where: LgaWhereUniqueInput;
};

export type LgaCreateOrConnectWithoutStateInput = {
  create: LgaCreateWithoutStateInput;
  where: LgaWhereUniqueInput;
};

export type LgaCreateOrConnectWithoutState_ConstInput = {
  create: LgaCreateWithoutState_ConstInput;
  where: LgaWhereUniqueInput;
};

export type LgaCreateOrConnectWithoutWardsInput = {
  create: LgaCreateWithoutWardsInput;
  where: LgaWhereUniqueInput;
};

export type LgaCreateWithoutFed_ConstInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  pu?: InputMaybe<PuCreateNestedManyWithoutLgaInput>;
  senatorial_district: Senatorial_DistrictCreateNestedOneWithoutLgaInput;
  state: StateCreateNestedOneWithoutLgasInput;
  state_const: State_ConstCreateNestedOneWithoutLgaInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardCreateNestedManyWithoutLgaInput>;
};

export type LgaCreateWithoutPuInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const: Fed_ConstCreateNestedOneWithoutLgaInput;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  senatorial_district: Senatorial_DistrictCreateNestedOneWithoutLgaInput;
  state: StateCreateNestedOneWithoutLgasInput;
  state_const: State_ConstCreateNestedOneWithoutLgaInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardCreateNestedManyWithoutLgaInput>;
};

export type LgaCreateWithoutStateInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const: Fed_ConstCreateNestedOneWithoutLgaInput;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  pu?: InputMaybe<PuCreateNestedManyWithoutLgaInput>;
  senatorial_district: Senatorial_DistrictCreateNestedOneWithoutLgaInput;
  state_const: State_ConstCreateNestedOneWithoutLgaInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardCreateNestedManyWithoutLgaInput>;
};

export type LgaCreateWithoutState_ConstInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const: Fed_ConstCreateNestedOneWithoutLgaInput;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  pu?: InputMaybe<PuCreateNestedManyWithoutLgaInput>;
  senatorial_district: Senatorial_DistrictCreateNestedOneWithoutLgaInput;
  state: StateCreateNestedOneWithoutLgasInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardCreateNestedManyWithoutLgaInput>;
};

export type LgaCreateWithoutWardsInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const: Fed_ConstCreateNestedOneWithoutLgaInput;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  pu?: InputMaybe<PuCreateNestedManyWithoutLgaInput>;
  senatorial_district: Senatorial_DistrictCreateNestedOneWithoutLgaInput;
  state: StateCreateNestedOneWithoutLgasInput;
  state_const: State_ConstCreateNestedOneWithoutLgaInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type LgaOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LgaOrderByWithRelationInput = {
  chatroom_id?: InputMaybe<SortOrder>;
  code?: InputMaybe<SortOrder>;
  created_at?: InputMaybe<SortOrder>;
  fed_const?: InputMaybe<Fed_ConstOrderByWithRelationInput>;
  fed_const_id?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  pu?: InputMaybe<PuOrderByRelationAggregateInput>;
  senatorial_district?: InputMaybe<Senatorial_DistrictOrderByWithRelationInput>;
  senatorial_id?: InputMaybe<SortOrder>;
  state?: InputMaybe<StateOrderByWithRelationInput>;
  state_const?: InputMaybe<State_ConstOrderByWithRelationInput>;
  state_const_id?: InputMaybe<SortOrder>;
  state_id?: InputMaybe<SortOrder>;
  updated_at?: InputMaybe<SortOrder>;
  wards?: InputMaybe<WardOrderByRelationAggregateInput>;
};

export type LgaScalarWhereInput = {
  AND?: InputMaybe<Array<LgaScalarWhereInput>>;
  NOT?: InputMaybe<Array<LgaScalarWhereInput>>;
  OR?: InputMaybe<Array<LgaScalarWhereInput>>;
  chatroom_id?: InputMaybe<StringFilter>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  fed_const_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  latitude?: InputMaybe<StringFilter>;
  longitude?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  senatorial_id?: InputMaybe<IntFilter>;
  state_const_id?: InputMaybe<IntFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type LgaUpdateInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutLgaNestedInput>;
  senatorial_district?: InputMaybe<Senatorial_DistrictUpdateOneRequiredWithoutLgaNestedInput>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutLgasNestedInput>;
  state_const?: InputMaybe<State_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardUpdateManyWithoutLgaNestedInput>;
};

export type LgaUpdateManyMutationInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type LgaUpdateManyWithWhereWithoutFed_ConstInput = {
  data: LgaUpdateManyMutationInput;
  where: LgaScalarWhereInput;
};

export type LgaUpdateManyWithWhereWithoutStateInput = {
  data: LgaUpdateManyMutationInput;
  where: LgaScalarWhereInput;
};

export type LgaUpdateManyWithWhereWithoutState_ConstInput = {
  data: LgaUpdateManyMutationInput;
  where: LgaScalarWhereInput;
};

export type LgaUpdateManyWithoutFed_ConstNestedInput = {
  connect?: InputMaybe<Array<LgaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LgaCreateOrConnectWithoutFed_ConstInput>>;
  create?: InputMaybe<Array<LgaCreateWithoutFed_ConstInput>>;
  createMany?: InputMaybe<LgaCreateManyFed_ConstInputEnvelope>;
  delete?: InputMaybe<Array<LgaWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LgaScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LgaWhereUniqueInput>>;
  set?: InputMaybe<Array<LgaWhereUniqueInput>>;
  update?: InputMaybe<Array<LgaUpdateWithWhereUniqueWithoutFed_ConstInput>>;
  updateMany?: InputMaybe<Array<LgaUpdateManyWithWhereWithoutFed_ConstInput>>;
  upsert?: InputMaybe<Array<LgaUpsertWithWhereUniqueWithoutFed_ConstInput>>;
};

export type LgaUpdateManyWithoutStateNestedInput = {
  connect?: InputMaybe<Array<LgaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LgaCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<LgaCreateWithoutStateInput>>;
  createMany?: InputMaybe<LgaCreateManyStateInputEnvelope>;
  delete?: InputMaybe<Array<LgaWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LgaScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LgaWhereUniqueInput>>;
  set?: InputMaybe<Array<LgaWhereUniqueInput>>;
  update?: InputMaybe<Array<LgaUpdateWithWhereUniqueWithoutStateInput>>;
  updateMany?: InputMaybe<Array<LgaUpdateManyWithWhereWithoutStateInput>>;
  upsert?: InputMaybe<Array<LgaUpsertWithWhereUniqueWithoutStateInput>>;
};

export type LgaUpdateManyWithoutState_ConstNestedInput = {
  connect?: InputMaybe<Array<LgaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LgaCreateOrConnectWithoutState_ConstInput>>;
  create?: InputMaybe<Array<LgaCreateWithoutState_ConstInput>>;
  createMany?: InputMaybe<LgaCreateManyState_ConstInputEnvelope>;
  delete?: InputMaybe<Array<LgaWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LgaScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LgaWhereUniqueInput>>;
  set?: InputMaybe<Array<LgaWhereUniqueInput>>;
  update?: InputMaybe<Array<LgaUpdateWithWhereUniqueWithoutState_ConstInput>>;
  updateMany?: InputMaybe<Array<LgaUpdateManyWithWhereWithoutState_ConstInput>>;
  upsert?: InputMaybe<Array<LgaUpsertWithWhereUniqueWithoutState_ConstInput>>;
};

export type LgaUpdateOneRequiredWithoutPuNestedInput = {
  connect?: InputMaybe<LgaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LgaCreateOrConnectWithoutPuInput>;
  create?: InputMaybe<LgaCreateWithoutPuInput>;
  update?: InputMaybe<LgaUpdateWithoutPuInput>;
  upsert?: InputMaybe<LgaUpsertWithoutPuInput>;
};

export type LgaUpdateOneRequiredWithoutWardsNestedInput = {
  connect?: InputMaybe<LgaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LgaCreateOrConnectWithoutWardsInput>;
  create?: InputMaybe<LgaCreateWithoutWardsInput>;
  update?: InputMaybe<LgaUpdateWithoutWardsInput>;
  upsert?: InputMaybe<LgaUpsertWithoutWardsInput>;
};

export type LgaUpdateWithWhereUniqueWithoutFed_ConstInput = {
  data: LgaUpdateWithoutFed_ConstInput;
  where: LgaWhereUniqueInput;
};

export type LgaUpdateWithWhereUniqueWithoutStateInput = {
  data: LgaUpdateWithoutStateInput;
  where: LgaWhereUniqueInput;
};

export type LgaUpdateWithWhereUniqueWithoutState_ConstInput = {
  data: LgaUpdateWithoutState_ConstInput;
  where: LgaWhereUniqueInput;
};

export type LgaUpdateWithoutFed_ConstInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutLgaNestedInput>;
  senatorial_district?: InputMaybe<Senatorial_DistrictUpdateOneRequiredWithoutLgaNestedInput>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutLgasNestedInput>;
  state_const?: InputMaybe<State_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardUpdateManyWithoutLgaNestedInput>;
};

export type LgaUpdateWithoutPuInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  senatorial_district?: InputMaybe<Senatorial_DistrictUpdateOneRequiredWithoutLgaNestedInput>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutLgasNestedInput>;
  state_const?: InputMaybe<State_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardUpdateManyWithoutLgaNestedInput>;
};

export type LgaUpdateWithoutStateInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutLgaNestedInput>;
  senatorial_district?: InputMaybe<Senatorial_DistrictUpdateOneRequiredWithoutLgaNestedInput>;
  state_const?: InputMaybe<State_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardUpdateManyWithoutLgaNestedInput>;
};

export type LgaUpdateWithoutState_ConstInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutLgaNestedInput>;
  senatorial_district?: InputMaybe<Senatorial_DistrictUpdateOneRequiredWithoutLgaNestedInput>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutLgasNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardUpdateManyWithoutLgaNestedInput>;
};

export type LgaUpdateWithoutWardsInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutLgaNestedInput>;
  senatorial_district?: InputMaybe<Senatorial_DistrictUpdateOneRequiredWithoutLgaNestedInput>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutLgasNestedInput>;
  state_const?: InputMaybe<State_ConstUpdateOneRequiredWithoutLgaNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type LgaUpsertWithWhereUniqueWithoutFed_ConstInput = {
  create: LgaCreateWithoutFed_ConstInput;
  update: LgaUpdateWithoutFed_ConstInput;
  where: LgaWhereUniqueInput;
};

export type LgaUpsertWithWhereUniqueWithoutStateInput = {
  create: LgaCreateWithoutStateInput;
  update: LgaUpdateWithoutStateInput;
  where: LgaWhereUniqueInput;
};

export type LgaUpsertWithWhereUniqueWithoutState_ConstInput = {
  create: LgaCreateWithoutState_ConstInput;
  update: LgaUpdateWithoutState_ConstInput;
  where: LgaWhereUniqueInput;
};

export type LgaUpsertWithoutPuInput = {
  create: LgaCreateWithoutPuInput;
  update: LgaUpdateWithoutPuInput;
};

export type LgaUpsertWithoutWardsInput = {
  create: LgaCreateWithoutWardsInput;
  update: LgaUpdateWithoutWardsInput;
};

export type LgaWhereInput = {
  AND?: InputMaybe<Array<LgaWhereInput>>;
  NOT?: InputMaybe<Array<LgaWhereInput>>;
  OR?: InputMaybe<Array<LgaWhereInput>>;
  chatroom_id?: InputMaybe<StringFilter>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  fed_const?: InputMaybe<Fed_ConstRelationFilter>;
  fed_const_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  latitude?: InputMaybe<StringFilter>;
  longitude?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  pu?: InputMaybe<PuListRelationFilter>;
  senatorial_district?: InputMaybe<Senatorial_DistrictRelationFilter>;
  senatorial_id?: InputMaybe<IntFilter>;
  state?: InputMaybe<StateRelationFilter>;
  state_const?: InputMaybe<State_ConstRelationFilter>;
  state_const_id?: InputMaybe<IntFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  wards?: InputMaybe<WardListRelationFilter>;
};

export type LgaWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type MemberCreateInput = {
  address: Scalars['String'];
  alt_phone?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dob?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first_name: Scalars['String'];
  is_a_candidate?: InputMaybe<Scalars['Boolean']>;
  is_a_delegate?: InputMaybe<Scalars['Boolean']>;
  is_an_agent?: InputMaybe<Scalars['Boolean']>;
  is_an_aspirant?: InputMaybe<Scalars['Boolean']>;
  is_candidate?: InputMaybe<Scalars['Boolean']>;
  is_p_appointed?: InputMaybe<Scalars['Boolean']>;
  is_p_elected?: InputMaybe<Scalars['Boolean']>;
  last_name: Scalars['String'];
  lga_id: Scalars['Int'];
  marital_status?: InputMaybe<Marital_Status>;
  member_type?: InputMaybe<Member_Type>;
  middle_name?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Scalars['String']>;
  occupation?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone: Scalars['String'];
  state_id: Scalars['Int'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
  vin?: InputMaybe<Scalars['String']>;
  ward_id: Scalars['Int'];
};

export type MemberOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  alt_phone?: InputMaybe<SortOrder>;
  created_at?: InputMaybe<SortOrder>;
  dob?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  first_name?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  is_a_candidate?: InputMaybe<SortOrder>;
  is_a_delegate?: InputMaybe<SortOrder>;
  is_an_agent?: InputMaybe<SortOrder>;
  is_an_aspirant?: InputMaybe<SortOrder>;
  is_candidate?: InputMaybe<SortOrder>;
  is_p_appointed?: InputMaybe<SortOrder>;
  is_p_elected?: InputMaybe<SortOrder>;
  last_name?: InputMaybe<SortOrder>;
  lga_id?: InputMaybe<SortOrder>;
  marital_status?: InputMaybe<SortOrder>;
  member_type?: InputMaybe<SortOrder>;
  middle_name?: InputMaybe<SortOrder>;
  nin?: InputMaybe<SortOrder>;
  occupation?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  state_id?: InputMaybe<SortOrder>;
  updated_at?: InputMaybe<SortOrder>;
  vin?: InputMaybe<SortOrder>;
  ward_id?: InputMaybe<SortOrder>;
};

export type MemberWhereInput = {
  AND?: InputMaybe<Array<MemberWhereInput>>;
  NOT?: InputMaybe<Array<MemberWhereInput>>;
  OR?: InputMaybe<Array<MemberWhereInput>>;
  address?: InputMaybe<StringFilter>;
  alt_phone?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  dob?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  first_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  is_a_candidate?: InputMaybe<BoolFilter>;
  is_a_delegate?: InputMaybe<BoolFilter>;
  is_an_agent?: InputMaybe<BoolFilter>;
  is_an_aspirant?: InputMaybe<BoolFilter>;
  is_candidate?: InputMaybe<BoolFilter>;
  is_p_appointed?: InputMaybe<BoolFilter>;
  is_p_elected?: InputMaybe<BoolFilter>;
  last_name?: InputMaybe<StringFilter>;
  lga_id?: InputMaybe<IntFilter>;
  marital_status?: InputMaybe<EnumMarital_StatusFilter>;
  member_type?: InputMaybe<EnumMember_TypeFilter>;
  middle_name?: InputMaybe<StringFilter>;
  nin?: InputMaybe<StringFilter>;
  occupation?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  vin?: InputMaybe<StringFilter>;
  ward_id?: InputMaybe<IntFilter>;
};

export type MemberWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Pu = {
  __typename?: 'pu';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  lga: Lga;
  lga_id: Scalars['Int'];
  name: Scalars['String'];
  state: State;
  state_id: Scalars['Int'];
  updated_at?: Maybe<Scalars['DateTime']>;
  ward: Ward;
  ward_id: Scalars['Int'];
};

export type PuCreateManyLgaInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  state_id: Scalars['Int'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
  ward_id: Scalars['Int'];
};

export type PuCreateManyLgaInputEnvelope = {
  data: Array<PuCreateManyLgaInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PuCreateManyStateInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  lga_id: Scalars['Int'];
  name: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
  ward_id: Scalars['Int'];
};

export type PuCreateManyStateInputEnvelope = {
  data: Array<PuCreateManyStateInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PuCreateManyWardInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  lga_id: Scalars['Int'];
  name: Scalars['String'];
  state_id: Scalars['Int'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PuCreateManyWardInputEnvelope = {
  data: Array<PuCreateManyWardInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PuCreateNestedManyWithoutLgaInput = {
  connect?: InputMaybe<Array<PuWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PuCreateOrConnectWithoutLgaInput>>;
  create?: InputMaybe<Array<PuCreateWithoutLgaInput>>;
  createMany?: InputMaybe<PuCreateManyLgaInputEnvelope>;
};

export type PuCreateNestedManyWithoutStateInput = {
  connect?: InputMaybe<Array<PuWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PuCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<PuCreateWithoutStateInput>>;
  createMany?: InputMaybe<PuCreateManyStateInputEnvelope>;
};

export type PuCreateNestedManyWithoutWardInput = {
  connect?: InputMaybe<Array<PuWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PuCreateOrConnectWithoutWardInput>>;
  create?: InputMaybe<Array<PuCreateWithoutWardInput>>;
  createMany?: InputMaybe<PuCreateManyWardInputEnvelope>;
};

export type PuCreateOrConnectWithoutLgaInput = {
  create: PuCreateWithoutLgaInput;
  where: PuWhereUniqueInput;
};

export type PuCreateOrConnectWithoutStateInput = {
  create: PuCreateWithoutStateInput;
  where: PuWhereUniqueInput;
};

export type PuCreateOrConnectWithoutWardInput = {
  create: PuCreateWithoutWardInput;
  where: PuWhereUniqueInput;
};

export type PuCreateWithoutLgaInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  state: StateCreateNestedOneWithoutPuInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  ward: WardCreateNestedOneWithoutPuInput;
};

export type PuCreateWithoutStateInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  lga: LgaCreateNestedOneWithoutPuInput;
  name: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
  ward: WardCreateNestedOneWithoutPuInput;
};

export type PuCreateWithoutWardInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  lga: LgaCreateNestedOneWithoutPuInput;
  name: Scalars['String'];
  state: StateCreateNestedOneWithoutPuInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PuOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PuScalarWhereInput = {
  AND?: InputMaybe<Array<PuScalarWhereInput>>;
  NOT?: InputMaybe<Array<PuScalarWhereInput>>;
  OR?: InputMaybe<Array<PuScalarWhereInput>>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  lga_id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  ward_id?: InputMaybe<IntFilter>;
};

export type PuUpdateManyMutationInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PuUpdateManyWithWhereWithoutLgaInput = {
  data: PuUpdateManyMutationInput;
  where: PuScalarWhereInput;
};

export type PuUpdateManyWithWhereWithoutStateInput = {
  data: PuUpdateManyMutationInput;
  where: PuScalarWhereInput;
};

export type PuUpdateManyWithWhereWithoutWardInput = {
  data: PuUpdateManyMutationInput;
  where: PuScalarWhereInput;
};

export type PuUpdateManyWithoutLgaNestedInput = {
  connect?: InputMaybe<Array<PuWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PuCreateOrConnectWithoutLgaInput>>;
  create?: InputMaybe<Array<PuCreateWithoutLgaInput>>;
  createMany?: InputMaybe<PuCreateManyLgaInputEnvelope>;
  delete?: InputMaybe<Array<PuWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PuScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PuWhereUniqueInput>>;
  set?: InputMaybe<Array<PuWhereUniqueInput>>;
  update?: InputMaybe<Array<PuUpdateWithWhereUniqueWithoutLgaInput>>;
  updateMany?: InputMaybe<Array<PuUpdateManyWithWhereWithoutLgaInput>>;
  upsert?: InputMaybe<Array<PuUpsertWithWhereUniqueWithoutLgaInput>>;
};

export type PuUpdateManyWithoutStateNestedInput = {
  connect?: InputMaybe<Array<PuWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PuCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<PuCreateWithoutStateInput>>;
  createMany?: InputMaybe<PuCreateManyStateInputEnvelope>;
  delete?: InputMaybe<Array<PuWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PuScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PuWhereUniqueInput>>;
  set?: InputMaybe<Array<PuWhereUniqueInput>>;
  update?: InputMaybe<Array<PuUpdateWithWhereUniqueWithoutStateInput>>;
  updateMany?: InputMaybe<Array<PuUpdateManyWithWhereWithoutStateInput>>;
  upsert?: InputMaybe<Array<PuUpsertWithWhereUniqueWithoutStateInput>>;
};

export type PuUpdateManyWithoutWardNestedInput = {
  connect?: InputMaybe<Array<PuWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PuCreateOrConnectWithoutWardInput>>;
  create?: InputMaybe<Array<PuCreateWithoutWardInput>>;
  createMany?: InputMaybe<PuCreateManyWardInputEnvelope>;
  delete?: InputMaybe<Array<PuWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PuScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PuWhereUniqueInput>>;
  set?: InputMaybe<Array<PuWhereUniqueInput>>;
  update?: InputMaybe<Array<PuUpdateWithWhereUniqueWithoutWardInput>>;
  updateMany?: InputMaybe<Array<PuUpdateManyWithWhereWithoutWardInput>>;
  upsert?: InputMaybe<Array<PuUpsertWithWhereUniqueWithoutWardInput>>;
};

export type PuUpdateWithWhereUniqueWithoutLgaInput = {
  data: PuUpdateWithoutLgaInput;
  where: PuWhereUniqueInput;
};

export type PuUpdateWithWhereUniqueWithoutStateInput = {
  data: PuUpdateWithoutStateInput;
  where: PuWhereUniqueInput;
};

export type PuUpdateWithWhereUniqueWithoutWardInput = {
  data: PuUpdateWithoutWardInput;
  where: PuWhereUniqueInput;
};

export type PuUpdateWithoutLgaInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutPuNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  ward?: InputMaybe<WardUpdateOneRequiredWithoutPuNestedInput>;
};

export type PuUpdateWithoutStateInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  lga?: InputMaybe<LgaUpdateOneRequiredWithoutPuNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  ward?: InputMaybe<WardUpdateOneRequiredWithoutPuNestedInput>;
};

export type PuUpdateWithoutWardInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  lga?: InputMaybe<LgaUpdateOneRequiredWithoutPuNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutPuNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PuUpsertWithWhereUniqueWithoutLgaInput = {
  create: PuCreateWithoutLgaInput;
  update: PuUpdateWithoutLgaInput;
  where: PuWhereUniqueInput;
};

export type PuUpsertWithWhereUniqueWithoutStateInput = {
  create: PuCreateWithoutStateInput;
  update: PuUpdateWithoutStateInput;
  where: PuWhereUniqueInput;
};

export type PuUpsertWithWhereUniqueWithoutWardInput = {
  create: PuCreateWithoutWardInput;
  update: PuUpdateWithoutWardInput;
  where: PuWhereUniqueInput;
};

export type PuWhereInput = {
  AND?: InputMaybe<Array<PuWhereInput>>;
  NOT?: InputMaybe<Array<PuWhereInput>>;
  OR?: InputMaybe<Array<PuWhereInput>>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  lga?: InputMaybe<LgaRelationFilter>;
  lga_id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  state?: InputMaybe<StateRelationFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  ward?: InputMaybe<WardRelationFilter>;
  ward_id?: InputMaybe<IntFilter>;
};

export type PuWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Senatorial_District = {
  __typename?: 'senatorial_district';
  _count: Senatorial_DistrictCount;
  created_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  lga?: Maybe<Array<Lga>>;
  name: Scalars['String'];
  state_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Senatorial_DistrictCreateNestedOneWithoutLgaInput = {
  connect?: InputMaybe<Senatorial_DistrictWhereUniqueInput>;
  connectOrCreate?: InputMaybe<Senatorial_DistrictCreateOrConnectWithoutLgaInput>;
  create?: InputMaybe<Senatorial_DistrictCreateWithoutLgaInput>;
};

export type Senatorial_DistrictCreateOrConnectWithoutLgaInput = {
  create: Senatorial_DistrictCreateWithoutLgaInput;
  where: Senatorial_DistrictWhereUniqueInput;
};

export type Senatorial_DistrictCreateWithoutLgaInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  state_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type Senatorial_DistrictOrderByWithRelationInput = {
  created_at?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lga?: InputMaybe<LgaOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  state_id?: InputMaybe<SortOrder>;
  updated_at?: InputMaybe<SortOrder>;
};

export type Senatorial_DistrictUpdateOneRequiredWithoutLgaNestedInput = {
  connect?: InputMaybe<Senatorial_DistrictWhereUniqueInput>;
  connectOrCreate?: InputMaybe<Senatorial_DistrictCreateOrConnectWithoutLgaInput>;
  create?: InputMaybe<Senatorial_DistrictCreateWithoutLgaInput>;
  update?: InputMaybe<Senatorial_DistrictUpdateWithoutLgaInput>;
  upsert?: InputMaybe<Senatorial_DistrictUpsertWithoutLgaInput>;
};

export type Senatorial_DistrictUpdateWithoutLgaInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  state_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type Senatorial_DistrictUpsertWithoutLgaInput = {
  create: Senatorial_DistrictCreateWithoutLgaInput;
  update: Senatorial_DistrictUpdateWithoutLgaInput;
};

export type Senatorial_DistrictWhereInput = {
  AND?: InputMaybe<Array<Senatorial_DistrictWhereInput>>;
  NOT?: InputMaybe<Array<Senatorial_DistrictWhereInput>>;
  OR?: InputMaybe<Array<Senatorial_DistrictWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  lga?: InputMaybe<LgaListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Senatorial_DistrictWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type State = {
  __typename?: 'state';
  _count: StateCount;
  capital?: Maybe<Scalars['String']>;
  chatroom_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  fed_const?: Maybe<Array<Fed_Const>>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['String']>;
  lgas?: Maybe<Array<Lga>>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pu?: Maybe<Array<Pu>>;
  state_code?: Maybe<Scalars['String']>;
  state_consts?: Maybe<Array<State_Const>>;
  updated_at?: Maybe<Scalars['DateTime']>;
  wards?: Maybe<Array<Ward>>;
};

export type StateCreateNestedOneWithoutFed_ConstInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutFed_ConstInput>;
  create?: InputMaybe<StateCreateWithoutFed_ConstInput>;
};

export type StateCreateNestedOneWithoutLgasInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutLgasInput>;
  create?: InputMaybe<StateCreateWithoutLgasInput>;
};

export type StateCreateNestedOneWithoutPuInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutPuInput>;
  create?: InputMaybe<StateCreateWithoutPuInput>;
};

export type StateCreateNestedOneWithoutState_ConstsInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutState_ConstsInput>;
  create?: InputMaybe<StateCreateWithoutState_ConstsInput>;
};

export type StateCreateNestedOneWithoutWardsInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutWardsInput>;
  create?: InputMaybe<StateCreateWithoutWardsInput>;
};

export type StateCreateOrConnectWithoutFed_ConstInput = {
  create: StateCreateWithoutFed_ConstInput;
  where: StateWhereUniqueInput;
};

export type StateCreateOrConnectWithoutLgasInput = {
  create: StateCreateWithoutLgasInput;
  where: StateWhereUniqueInput;
};

export type StateCreateOrConnectWithoutPuInput = {
  create: StateCreateWithoutPuInput;
  where: StateWhereUniqueInput;
};

export type StateCreateOrConnectWithoutState_ConstsInput = {
  create: StateCreateWithoutState_ConstsInput;
  where: StateWhereUniqueInput;
};

export type StateCreateOrConnectWithoutWardsInput = {
  create: StateCreateWithoutWardsInput;
  where: StateWhereUniqueInput;
};

export type StateCreateWithoutFed_ConstInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  lgas?: InputMaybe<LgaCreateNestedManyWithoutStateInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuCreateNestedManyWithoutStateInput>;
  state_code?: InputMaybe<Scalars['String']>;
  state_consts?: InputMaybe<State_ConstCreateNestedManyWithoutStateInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardCreateNestedManyWithoutStateInput>;
};

export type StateCreateWithoutLgasInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstCreateNestedManyWithoutStateInput>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuCreateNestedManyWithoutStateInput>;
  state_code?: InputMaybe<Scalars['String']>;
  state_consts?: InputMaybe<State_ConstCreateNestedManyWithoutStateInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardCreateNestedManyWithoutStateInput>;
};

export type StateCreateWithoutPuInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstCreateNestedManyWithoutStateInput>;
  latitude?: InputMaybe<Scalars['String']>;
  lgas?: InputMaybe<LgaCreateNestedManyWithoutStateInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  state_code?: InputMaybe<Scalars['String']>;
  state_consts?: InputMaybe<State_ConstCreateNestedManyWithoutStateInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardCreateNestedManyWithoutStateInput>;
};

export type StateCreateWithoutState_ConstsInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstCreateNestedManyWithoutStateInput>;
  latitude?: InputMaybe<Scalars['String']>;
  lgas?: InputMaybe<LgaCreateNestedManyWithoutStateInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuCreateNestedManyWithoutStateInput>;
  state_code?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardCreateNestedManyWithoutStateInput>;
};

export type StateCreateWithoutWardsInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstCreateNestedManyWithoutStateInput>;
  latitude?: InputMaybe<Scalars['String']>;
  lgas?: InputMaybe<LgaCreateNestedManyWithoutStateInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuCreateNestedManyWithoutStateInput>;
  state_code?: InputMaybe<Scalars['String']>;
  state_consts?: InputMaybe<State_ConstCreateNestedManyWithoutStateInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type StateOrderByWithRelationInput = {
  capital?: InputMaybe<SortOrder>;
  chatroom_id?: InputMaybe<SortOrder>;
  created_at?: InputMaybe<SortOrder>;
  fed_const?: InputMaybe<Fed_ConstOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  lgas?: InputMaybe<LgaOrderByRelationAggregateInput>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  pu?: InputMaybe<PuOrderByRelationAggregateInput>;
  state_code?: InputMaybe<SortOrder>;
  state_consts?: InputMaybe<State_ConstOrderByRelationAggregateInput>;
  updated_at?: InputMaybe<SortOrder>;
  wards?: InputMaybe<WardOrderByRelationAggregateInput>;
};

export type StateUpdateOneRequiredWithoutFed_ConstNestedInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutFed_ConstInput>;
  create?: InputMaybe<StateCreateWithoutFed_ConstInput>;
  update?: InputMaybe<StateUpdateWithoutFed_ConstInput>;
  upsert?: InputMaybe<StateUpsertWithoutFed_ConstInput>;
};

export type StateUpdateOneRequiredWithoutLgasNestedInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutLgasInput>;
  create?: InputMaybe<StateCreateWithoutLgasInput>;
  update?: InputMaybe<StateUpdateWithoutLgasInput>;
  upsert?: InputMaybe<StateUpsertWithoutLgasInput>;
};

export type StateUpdateOneRequiredWithoutPuNestedInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutPuInput>;
  create?: InputMaybe<StateCreateWithoutPuInput>;
  update?: InputMaybe<StateUpdateWithoutPuInput>;
  upsert?: InputMaybe<StateUpsertWithoutPuInput>;
};

export type StateUpdateOneRequiredWithoutState_ConstsNestedInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutState_ConstsInput>;
  create?: InputMaybe<StateCreateWithoutState_ConstsInput>;
  update?: InputMaybe<StateUpdateWithoutState_ConstsInput>;
  upsert?: InputMaybe<StateUpsertWithoutState_ConstsInput>;
};

export type StateUpdateOneRequiredWithoutWardsNestedInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutWardsInput>;
  create?: InputMaybe<StateCreateWithoutWardsInput>;
  update?: InputMaybe<StateUpdateWithoutWardsInput>;
  upsert?: InputMaybe<StateUpsertWithoutWardsInput>;
};

export type StateUpdateWithoutFed_ConstInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  lgas?: InputMaybe<LgaUpdateManyWithoutStateNestedInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutStateNestedInput>;
  state_code?: InputMaybe<Scalars['String']>;
  state_consts?: InputMaybe<State_ConstUpdateManyWithoutStateNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardUpdateManyWithoutStateNestedInput>;
};

export type StateUpdateWithoutLgasInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstUpdateManyWithoutStateNestedInput>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutStateNestedInput>;
  state_code?: InputMaybe<Scalars['String']>;
  state_consts?: InputMaybe<State_ConstUpdateManyWithoutStateNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardUpdateManyWithoutStateNestedInput>;
};

export type StateUpdateWithoutPuInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstUpdateManyWithoutStateNestedInput>;
  latitude?: InputMaybe<Scalars['String']>;
  lgas?: InputMaybe<LgaUpdateManyWithoutStateNestedInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  state_code?: InputMaybe<Scalars['String']>;
  state_consts?: InputMaybe<State_ConstUpdateManyWithoutStateNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardUpdateManyWithoutStateNestedInput>;
};

export type StateUpdateWithoutState_ConstsInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstUpdateManyWithoutStateNestedInput>;
  latitude?: InputMaybe<Scalars['String']>;
  lgas?: InputMaybe<LgaUpdateManyWithoutStateNestedInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutStateNestedInput>;
  state_code?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  wards?: InputMaybe<WardUpdateManyWithoutStateNestedInput>;
};

export type StateUpdateWithoutWardsInput = {
  capital?: InputMaybe<Scalars['String']>;
  chatroom_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fed_const?: InputMaybe<Fed_ConstUpdateManyWithoutStateNestedInput>;
  latitude?: InputMaybe<Scalars['String']>;
  lgas?: InputMaybe<LgaUpdateManyWithoutStateNestedInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutStateNestedInput>;
  state_code?: InputMaybe<Scalars['String']>;
  state_consts?: InputMaybe<State_ConstUpdateManyWithoutStateNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type StateUpsertWithoutFed_ConstInput = {
  create: StateCreateWithoutFed_ConstInput;
  update: StateUpdateWithoutFed_ConstInput;
};

export type StateUpsertWithoutLgasInput = {
  create: StateCreateWithoutLgasInput;
  update: StateUpdateWithoutLgasInput;
};

export type StateUpsertWithoutPuInput = {
  create: StateCreateWithoutPuInput;
  update: StateUpdateWithoutPuInput;
};

export type StateUpsertWithoutState_ConstsInput = {
  create: StateCreateWithoutState_ConstsInput;
  update: StateUpdateWithoutState_ConstsInput;
};

export type StateUpsertWithoutWardsInput = {
  create: StateCreateWithoutWardsInput;
  update: StateUpdateWithoutWardsInput;
};

export type StateWhereInput = {
  AND?: InputMaybe<Array<StateWhereInput>>;
  NOT?: InputMaybe<Array<StateWhereInput>>;
  OR?: InputMaybe<Array<StateWhereInput>>;
  capital?: InputMaybe<StringFilter>;
  chatroom_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  fed_const?: InputMaybe<Fed_ConstListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  latitude?: InputMaybe<StringFilter>;
  lgas?: InputMaybe<LgaListRelationFilter>;
  longitude?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  pu?: InputMaybe<PuListRelationFilter>;
  state_code?: InputMaybe<StringFilter>;
  state_consts?: InputMaybe<State_ConstListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  wards?: InputMaybe<WardListRelationFilter>;
};

export type StateWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type State_Const = {
  __typename?: 'state_const';
  _count: State_ConstCount;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  lga?: Maybe<Array<Lga>>;
  name: Scalars['String'];
  state: State;
  state_id: Scalars['Int'];
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type State_ConstCreateManyStateInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type State_ConstCreateManyStateInputEnvelope = {
  data: Array<State_ConstCreateManyStateInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type State_ConstCreateNestedManyWithoutStateInput = {
  connect?: InputMaybe<Array<State_ConstWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<State_ConstCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<State_ConstCreateWithoutStateInput>>;
  createMany?: InputMaybe<State_ConstCreateManyStateInputEnvelope>;
};

export type State_ConstCreateNestedOneWithoutLgaInput = {
  connect?: InputMaybe<State_ConstWhereUniqueInput>;
  connectOrCreate?: InputMaybe<State_ConstCreateOrConnectWithoutLgaInput>;
  create?: InputMaybe<State_ConstCreateWithoutLgaInput>;
};

export type State_ConstCreateOrConnectWithoutLgaInput = {
  create: State_ConstCreateWithoutLgaInput;
  where: State_ConstWhereUniqueInput;
};

export type State_ConstCreateOrConnectWithoutStateInput = {
  create: State_ConstCreateWithoutStateInput;
  where: State_ConstWhereUniqueInput;
};

export type State_ConstCreateWithoutLgaInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  state: StateCreateNestedOneWithoutState_ConstsInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type State_ConstCreateWithoutStateInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  lga?: InputMaybe<LgaCreateNestedManyWithoutState_ConstInput>;
  name: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type State_ConstOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type State_ConstOrderByWithRelationInput = {
  code?: InputMaybe<SortOrder>;
  created_at?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lga?: InputMaybe<LgaOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  state?: InputMaybe<StateOrderByWithRelationInput>;
  state_id?: InputMaybe<SortOrder>;
  updated_at?: InputMaybe<SortOrder>;
};

export type State_ConstScalarWhereInput = {
  AND?: InputMaybe<Array<State_ConstScalarWhereInput>>;
  NOT?: InputMaybe<Array<State_ConstScalarWhereInput>>;
  OR?: InputMaybe<Array<State_ConstScalarWhereInput>>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type State_ConstUpdateManyMutationInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type State_ConstUpdateManyWithWhereWithoutStateInput = {
  data: State_ConstUpdateManyMutationInput;
  where: State_ConstScalarWhereInput;
};

export type State_ConstUpdateManyWithoutStateNestedInput = {
  connect?: InputMaybe<Array<State_ConstWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<State_ConstCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<State_ConstCreateWithoutStateInput>>;
  createMany?: InputMaybe<State_ConstCreateManyStateInputEnvelope>;
  delete?: InputMaybe<Array<State_ConstWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<State_ConstScalarWhereInput>>;
  disconnect?: InputMaybe<Array<State_ConstWhereUniqueInput>>;
  set?: InputMaybe<Array<State_ConstWhereUniqueInput>>;
  update?: InputMaybe<Array<State_ConstUpdateWithWhereUniqueWithoutStateInput>>;
  updateMany?: InputMaybe<Array<State_ConstUpdateManyWithWhereWithoutStateInput>>;
  upsert?: InputMaybe<Array<State_ConstUpsertWithWhereUniqueWithoutStateInput>>;
};

export type State_ConstUpdateOneRequiredWithoutLgaNestedInput = {
  connect?: InputMaybe<State_ConstWhereUniqueInput>;
  connectOrCreate?: InputMaybe<State_ConstCreateOrConnectWithoutLgaInput>;
  create?: InputMaybe<State_ConstCreateWithoutLgaInput>;
  update?: InputMaybe<State_ConstUpdateWithoutLgaInput>;
  upsert?: InputMaybe<State_ConstUpsertWithoutLgaInput>;
};

export type State_ConstUpdateWithWhereUniqueWithoutStateInput = {
  data: State_ConstUpdateWithoutStateInput;
  where: State_ConstWhereUniqueInput;
};

export type State_ConstUpdateWithoutLgaInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutState_ConstsNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type State_ConstUpdateWithoutStateInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  lga?: InputMaybe<LgaUpdateManyWithoutState_ConstNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type State_ConstUpsertWithWhereUniqueWithoutStateInput = {
  create: State_ConstCreateWithoutStateInput;
  update: State_ConstUpdateWithoutStateInput;
  where: State_ConstWhereUniqueInput;
};

export type State_ConstUpsertWithoutLgaInput = {
  create: State_ConstCreateWithoutLgaInput;
  update: State_ConstUpdateWithoutLgaInput;
};

export type State_ConstWhereInput = {
  AND?: InputMaybe<Array<State_ConstWhereInput>>;
  NOT?: InputMaybe<Array<State_ConstWhereInput>>;
  OR?: InputMaybe<Array<State_ConstWhereInput>>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  lga?: InputMaybe<LgaListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  state?: InputMaybe<StateRelationFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type State_ConstWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Ward = {
  __typename?: 'ward';
  _count: WardCount;
  chatroom_id?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  created_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['String']>;
  lga: Lga;
  lga_id: Scalars['Int'];
  longitude?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  pu?: Maybe<Array<Pu>>;
  state: State;
  state_id: Scalars['Int'];
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type WardCreateManyLgaInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  state_id: Scalars['Int'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type WardCreateManyLgaInputEnvelope = {
  data: Array<WardCreateManyLgaInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type WardCreateManyStateInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['String']>;
  lga_id: Scalars['Int'];
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type WardCreateManyStateInputEnvelope = {
  data: Array<WardCreateManyStateInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type WardCreateNestedManyWithoutLgaInput = {
  connect?: InputMaybe<Array<WardWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WardCreateOrConnectWithoutLgaInput>>;
  create?: InputMaybe<Array<WardCreateWithoutLgaInput>>;
  createMany?: InputMaybe<WardCreateManyLgaInputEnvelope>;
};

export type WardCreateNestedManyWithoutStateInput = {
  connect?: InputMaybe<Array<WardWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WardCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<WardCreateWithoutStateInput>>;
  createMany?: InputMaybe<WardCreateManyStateInputEnvelope>;
};

export type WardCreateNestedOneWithoutPuInput = {
  connect?: InputMaybe<WardWhereUniqueInput>;
  connectOrCreate?: InputMaybe<WardCreateOrConnectWithoutPuInput>;
  create?: InputMaybe<WardCreateWithoutPuInput>;
};

export type WardCreateOrConnectWithoutLgaInput = {
  create: WardCreateWithoutLgaInput;
  where: WardWhereUniqueInput;
};

export type WardCreateOrConnectWithoutPuInput = {
  create: WardCreateWithoutPuInput;
  where: WardWhereUniqueInput;
};

export type WardCreateOrConnectWithoutStateInput = {
  create: WardCreateWithoutStateInput;
  where: WardWhereUniqueInput;
};

export type WardCreateWithoutLgaInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  pu?: InputMaybe<PuCreateNestedManyWithoutWardInput>;
  state: StateCreateNestedOneWithoutWardsInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type WardCreateWithoutPuInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  lga: LgaCreateNestedOneWithoutWardsInput;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  state: StateCreateNestedOneWithoutWardsInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type WardCreateWithoutStateInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  lga: LgaCreateNestedOneWithoutWardsInput;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  pu?: InputMaybe<PuCreateNestedManyWithoutWardInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type WardOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type WardScalarWhereInput = {
  AND?: InputMaybe<Array<WardScalarWhereInput>>;
  NOT?: InputMaybe<Array<WardScalarWhereInput>>;
  OR?: InputMaybe<Array<WardScalarWhereInput>>;
  chatroom_id?: InputMaybe<StringFilter>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  latitude?: InputMaybe<StringFilter>;
  lga_id?: InputMaybe<IntFilter>;
  longitude?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type WardUpdateManyMutationInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type WardUpdateManyWithWhereWithoutLgaInput = {
  data: WardUpdateManyMutationInput;
  where: WardScalarWhereInput;
};

export type WardUpdateManyWithWhereWithoutStateInput = {
  data: WardUpdateManyMutationInput;
  where: WardScalarWhereInput;
};

export type WardUpdateManyWithoutLgaNestedInput = {
  connect?: InputMaybe<Array<WardWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WardCreateOrConnectWithoutLgaInput>>;
  create?: InputMaybe<Array<WardCreateWithoutLgaInput>>;
  createMany?: InputMaybe<WardCreateManyLgaInputEnvelope>;
  delete?: InputMaybe<Array<WardWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<WardScalarWhereInput>>;
  disconnect?: InputMaybe<Array<WardWhereUniqueInput>>;
  set?: InputMaybe<Array<WardWhereUniqueInput>>;
  update?: InputMaybe<Array<WardUpdateWithWhereUniqueWithoutLgaInput>>;
  updateMany?: InputMaybe<Array<WardUpdateManyWithWhereWithoutLgaInput>>;
  upsert?: InputMaybe<Array<WardUpsertWithWhereUniqueWithoutLgaInput>>;
};

export type WardUpdateManyWithoutStateNestedInput = {
  connect?: InputMaybe<Array<WardWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WardCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<WardCreateWithoutStateInput>>;
  createMany?: InputMaybe<WardCreateManyStateInputEnvelope>;
  delete?: InputMaybe<Array<WardWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<WardScalarWhereInput>>;
  disconnect?: InputMaybe<Array<WardWhereUniqueInput>>;
  set?: InputMaybe<Array<WardWhereUniqueInput>>;
  update?: InputMaybe<Array<WardUpdateWithWhereUniqueWithoutStateInput>>;
  updateMany?: InputMaybe<Array<WardUpdateManyWithWhereWithoutStateInput>>;
  upsert?: InputMaybe<Array<WardUpsertWithWhereUniqueWithoutStateInput>>;
};

export type WardUpdateOneRequiredWithoutPuNestedInput = {
  connect?: InputMaybe<WardWhereUniqueInput>;
  connectOrCreate?: InputMaybe<WardCreateOrConnectWithoutPuInput>;
  create?: InputMaybe<WardCreateWithoutPuInput>;
  update?: InputMaybe<WardUpdateWithoutPuInput>;
  upsert?: InputMaybe<WardUpsertWithoutPuInput>;
};

export type WardUpdateWithWhereUniqueWithoutLgaInput = {
  data: WardUpdateWithoutLgaInput;
  where: WardWhereUniqueInput;
};

export type WardUpdateWithWhereUniqueWithoutStateInput = {
  data: WardUpdateWithoutStateInput;
  where: WardWhereUniqueInput;
};

export type WardUpdateWithoutLgaInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutWardNestedInput>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutWardsNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type WardUpdateWithoutPuInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  lga?: InputMaybe<LgaUpdateOneRequiredWithoutWardsNestedInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<StateUpdateOneRequiredWithoutWardsNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type WardUpdateWithoutStateInput = {
  chatroom_id?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  latitude?: InputMaybe<Scalars['String']>;
  lga?: InputMaybe<LgaUpdateOneRequiredWithoutWardsNestedInput>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pu?: InputMaybe<PuUpdateManyWithoutWardNestedInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type WardUpsertWithWhereUniqueWithoutLgaInput = {
  create: WardCreateWithoutLgaInput;
  update: WardUpdateWithoutLgaInput;
  where: WardWhereUniqueInput;
};

export type WardUpsertWithWhereUniqueWithoutStateInput = {
  create: WardCreateWithoutStateInput;
  update: WardUpdateWithoutStateInput;
  where: WardWhereUniqueInput;
};

export type WardUpsertWithoutPuInput = {
  create: WardCreateWithoutPuInput;
  update: WardUpdateWithoutPuInput;
};

export type WardWhereInput = {
  AND?: InputMaybe<Array<WardWhereInput>>;
  NOT?: InputMaybe<Array<WardWhereInput>>;
  OR?: InputMaybe<Array<WardWhereInput>>;
  chatroom_id?: InputMaybe<StringFilter>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  latitude?: InputMaybe<StringFilter>;
  lga?: InputMaybe<LgaRelationFilter>;
  lga_id?: InputMaybe<IntFilter>;
  longitude?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  pu?: InputMaybe<PuListRelationFilter>;
  state?: InputMaybe<StateRelationFilter>;
  state_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type WardWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type CreateMemberMutationVariables = Exact<{
  input: MemberCreateInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', createMember: { __typename?: 'ValidateMemberResponse', accessToken?: string | null, refreshToken?: string | null, member?: { __typename?: 'MemberDto', id?: string | null, first_name?: string | null, last_name?: string | null, middle_name?: string | null, address?: string | null, email?: string | null, alt_phone?: string | null, dob?: string | null, lga_id?: string | null, marital_status?: string | null, member_type?: string | null, nin?: string | null, occupation?: string | null, phone?: string | null, state_id?: string | null, vin?: string | null, ward_id?: string | null } | null } };

export type ValidateMemberMutationVariables = Exact<{
  input: ValidateMemberInput;
}>;


export type ValidateMemberMutation = { __typename?: 'Mutation', validateMember: { __typename?: 'ValidateMemberResponse', accessToken?: string | null, refreshToken?: string | null, member?: { __typename?: 'MemberDto', id?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null, middle_name?: string | null, address?: string | null, alt_phone?: string | null, dob?: string | null, lga_id?: string | null, marital_status?: string | null, member_type?: string | null, nin?: string | null, occupation?: string | null, phone?: string | null, state_id?: string | null, vin?: string | null, ward_id?: string | null } | null } };

export type FindAllLgasQueryVariables = Exact<{
  input: FindLgaInput;
}>;


export type FindAllLgasQuery = { __typename?: 'Query', findAllLga: Array<{ __typename?: 'lga', id: string, name: string }> };

export type FindAllStatesQueryVariables = Exact<{
  input: FindStateInput;
}>;


export type FindAllStatesQuery = { __typename?: 'Query', findAllStates: Array<{ __typename?: 'state', id: string, name?: string | null }> };

export type FindAllWardsQueryVariables = Exact<{
  input: FindWardInput;
}>;


export type FindAllWardsQuery = { __typename?: 'Query', findAllWards: Array<{ __typename?: 'ward', id: string, name: string }> };

export type VerifyNInQueryVariables = Exact<{
  input: VerifyNinInput;
}>;


export type VerifyNInQuery = { __typename?: 'Query', verifyNin: { __typename?: 'VerifyNinResponse', _id?: string | null, bvn?: string | null, customer?: string | null, dob?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null, state_of_origin?: string | null, state_of_residence?: string | null } };


export const CreateMemberDocument = gql`
    mutation CreateMember($input: memberCreateInput!) {
  createMember(input: $input) {
    accessToken
    refreshToken
    member {
      id
      first_name
      last_name
      middle_name
      address
      email
      alt_phone
      dob
      lga_id
      marital_status
      member_type
      nin
      occupation
      phone
      state_id
      vin
      ward_id
    }
  }
}
    `;
export type CreateMemberMutationFn = Apollo.MutationFunction<CreateMemberMutation, CreateMemberMutationVariables>;

/**
 * __useCreateMemberMutation__
 *
 * To run a mutation, you first call `useCreateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberMutation, { data, loading, error }] = useCreateMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemberMutation, CreateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, options);
      }
export type CreateMemberMutationHookResult = ReturnType<typeof useCreateMemberMutation>;
export type CreateMemberMutationResult = Apollo.MutationResult<CreateMemberMutation>;
export type CreateMemberMutationOptions = Apollo.BaseMutationOptions<CreateMemberMutation, CreateMemberMutationVariables>;
export const ValidateMemberDocument = gql`
    mutation ValidateMember($input: ValidateMemberInput!) {
  validateMember(input: $input) {
    accessToken
    refreshToken
    member {
      id
      first_name
      last_name
      email
      middle_name
      address
      alt_phone
      dob
      lga_id
      marital_status
      member_type
      nin
      occupation
      phone
      state_id
      vin
      ward_id
    }
  }
}
    `;
export type ValidateMemberMutationFn = Apollo.MutationFunction<ValidateMemberMutation, ValidateMemberMutationVariables>;

/**
 * __useValidateMemberMutation__
 *
 * To run a mutation, you first call `useValidateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateMemberMutation, { data, loading, error }] = useValidateMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useValidateMemberMutation(baseOptions?: Apollo.MutationHookOptions<ValidateMemberMutation, ValidateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateMemberMutation, ValidateMemberMutationVariables>(ValidateMemberDocument, options);
      }
export type ValidateMemberMutationHookResult = ReturnType<typeof useValidateMemberMutation>;
export type ValidateMemberMutationResult = Apollo.MutationResult<ValidateMemberMutation>;
export type ValidateMemberMutationOptions = Apollo.BaseMutationOptions<ValidateMemberMutation, ValidateMemberMutationVariables>;
export const FindAllLgasDocument = gql`
    query FindAllLgas($input: FindLgaInput!) {
  findAllLga(input: $input) {
    id
    name
  }
}
    `;

/**
 * __useFindAllLgasQuery__
 *
 * To run a query within a React component, call `useFindAllLgasQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllLgasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllLgasQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAllLgasQuery(baseOptions: Apollo.QueryHookOptions<FindAllLgasQuery, FindAllLgasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllLgasQuery, FindAllLgasQueryVariables>(FindAllLgasDocument, options);
      }
export function useFindAllLgasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllLgasQuery, FindAllLgasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllLgasQuery, FindAllLgasQueryVariables>(FindAllLgasDocument, options);
        }
export type FindAllLgasQueryHookResult = ReturnType<typeof useFindAllLgasQuery>;
export type FindAllLgasLazyQueryHookResult = ReturnType<typeof useFindAllLgasLazyQuery>;
export type FindAllLgasQueryResult = Apollo.QueryResult<FindAllLgasQuery, FindAllLgasQueryVariables>;
export const FindAllStatesDocument = gql`
    query FindAllStates($input: FindStateInput!) {
  findAllStates(input: $input) {
    id
    name
  }
}
    `;

/**
 * __useFindAllStatesQuery__
 *
 * To run a query within a React component, call `useFindAllStatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllStatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllStatesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAllStatesQuery(baseOptions: Apollo.QueryHookOptions<FindAllStatesQuery, FindAllStatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllStatesQuery, FindAllStatesQueryVariables>(FindAllStatesDocument, options);
      }
export function useFindAllStatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllStatesQuery, FindAllStatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllStatesQuery, FindAllStatesQueryVariables>(FindAllStatesDocument, options);
        }
export type FindAllStatesQueryHookResult = ReturnType<typeof useFindAllStatesQuery>;
export type FindAllStatesLazyQueryHookResult = ReturnType<typeof useFindAllStatesLazyQuery>;
export type FindAllStatesQueryResult = Apollo.QueryResult<FindAllStatesQuery, FindAllStatesQueryVariables>;
export const FindAllWardsDocument = gql`
    query FindAllWards($input: FindWardInput!) {
  findAllWards(input: $input) {
    id
    name
  }
}
    `;

/**
 * __useFindAllWardsQuery__
 *
 * To run a query within a React component, call `useFindAllWardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllWardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllWardsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAllWardsQuery(baseOptions: Apollo.QueryHookOptions<FindAllWardsQuery, FindAllWardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllWardsQuery, FindAllWardsQueryVariables>(FindAllWardsDocument, options);
      }
export function useFindAllWardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllWardsQuery, FindAllWardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllWardsQuery, FindAllWardsQueryVariables>(FindAllWardsDocument, options);
        }
export type FindAllWardsQueryHookResult = ReturnType<typeof useFindAllWardsQuery>;
export type FindAllWardsLazyQueryHookResult = ReturnType<typeof useFindAllWardsLazyQuery>;
export type FindAllWardsQueryResult = Apollo.QueryResult<FindAllWardsQuery, FindAllWardsQueryVariables>;
export const VerifyNInDocument = gql`
    query VerifyNIn($input: VerifyNinInput!) {
  verifyNin(input: $input) {
    _id
    bvn
    customer
    dob
    firstname
    lastname
    fullname
    state_of_origin
    state_of_residence
  }
}
    `;

/**
 * __useVerifyNInQuery__
 *
 * To run a query within a React component, call `useVerifyNInQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyNInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyNInQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyNInQuery(baseOptions: Apollo.QueryHookOptions<VerifyNInQuery, VerifyNInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyNInQuery, VerifyNInQueryVariables>(VerifyNInDocument, options);
      }
export function useVerifyNInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyNInQuery, VerifyNInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyNInQuery, VerifyNInQueryVariables>(VerifyNInDocument, options);
        }
export type VerifyNInQueryHookResult = ReturnType<typeof useVerifyNInQuery>;
export type VerifyNInLazyQueryHookResult = ReturnType<typeof useVerifyNInLazyQuery>;
export type VerifyNInQueryResult = Apollo.QueryResult<VerifyNInQuery, VerifyNInQueryVariables>;