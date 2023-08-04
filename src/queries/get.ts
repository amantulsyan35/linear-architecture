import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query getData {
    users {
      id
      name
      team {
        id
        name
      }
    }
    issues {
      id
      name
      user {
        id
        name
      }
      team {
        id
        name
      }
    }
    teams {
      id
      name
      members {
        id
        name
      }
      issues {
        id
        name
      }
    }
  }
`;
