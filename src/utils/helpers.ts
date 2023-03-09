import { OptionsInterface } from "../components/inputs";
import {
  FindAllLgasDocument,
  FindAllLgasQuery,
  FindAllLgasQueryVariables,
  FindAllStatesDocument,
  FindAllStatesQuery,
  FindAllStatesQueryVariables,
  FindAllWardsDocument,
  FindAllWardsQuery,
  FindAllWardsQueryVariables,
  FindLgaInput,
  VerifyNInDocument,
  VerifyNInQuery,
  VerifyNInQueryVariables,
} from "../generated/graphql";
import graphqlClient from "../graphql/apollo";

export const findtAllStates = async () => {
  try {
    const response = await graphqlClient.query<
      FindAllStatesQuery,
      FindAllStatesQueryVariables
    >({
      query: FindAllStatesDocument,
      variables: { input: {} },
    });

    if (response?.data?.findAllStates) {
      const resObj = response?.data?.findAllStates;
      const states: OptionsInterface[] = resObj.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      return states;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const findAllLgas = async (state: string) => {
  try {
    const response = await graphqlClient.query<
      FindAllLgasQuery,
      FindAllLgasQueryVariables
    >({
      query: FindAllLgasDocument,
      variables: {
        input: { where: { state: { is: { name: { equals: state } } } } },
      },
    });

    if (response?.data?.findAllLga) {
      const resObj = response?.data?.findAllLga;
      const lgas: OptionsInterface[] = resObj.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      return lgas;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const findAllWards = async (lgaId: number) => {
  try {
    const response = await graphqlClient.query<
      FindAllWardsQuery,
      FindAllWardsQueryVariables
    >({
      query: FindAllWardsDocument,
      variables: {
        input: { lga_id: lgaId },
      },
    });

    if (response?.data?.findAllWards) {
      const resObj = response?.data?.findAllWards;
      const wards: OptionsInterface[] = resObj.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      return wards;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyNin = async (nin: string) => {
  try {
    const response = await graphqlClient.query<
      VerifyNInQuery,
      VerifyNInQueryVariables
    >({
      query: VerifyNInDocument,
      variables: {
        input: { nin },
      },
    });

    if (response?.data?.verifyNin) {
      return true;
    }
  } catch (err) {
    throw new Error(err);
  }
};
