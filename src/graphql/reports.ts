import { gql, useQuery } from "@apollo/client";

const GET_QUESTIONS = gql`
  query {
    findAllReports {
      question
      option1
      option2
      option3
      option4
    }
  }
`;

export default GET_QUESTIONS;
