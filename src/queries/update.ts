import { gql } from "@apollo/client";

export const UPDATE_DATABASE_MUTATION = gql`
  mutation MarkComplete($data: [TeamInput]) {
    markComplete(data: $data)
  }
`;
