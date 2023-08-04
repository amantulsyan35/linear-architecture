import { gql } from "@apollo/client";

export const UPDATE_DATABASE_MUTATION = gql`
  mutation UpdateDatabase($data: [TeamInput]) {
    updateDatabase(data: $data)
  }
`;
