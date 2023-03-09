import { gql } from "@apollo/client";

interface IFetch {
  id?: number;
  lga_id?: number;
  state_id?: number;
}
export const GET_ALL_STATES = gql`
  query {
    findAllStates(input: {}) {
      id
      name
    }
  }
`;
