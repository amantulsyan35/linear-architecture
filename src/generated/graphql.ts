import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AllData = {
  __typename?: 'AllData';
  issues: Array<Issue>;
  teams: Array<Team>;
  users: Array<User>;
};

export type Issue = {
  __typename?: 'Issue';
  id: Scalars['ID'];
  name: Scalars['String'];
  team: Team;
  user: User;
};

export type IssueInput = {
  assignee: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  markComplete: Scalars['String'];
};


export type MutationMarkCompleteArgs = {
  data: Array<TeamInput>;
};

export type Query = {
  __typename?: 'Query';
  allData: Array<AllData>;
  issues: Array<Issue>;
  teams: Array<Team>;
  users: Array<User>;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  issues: Array<Issue>;
  members: Array<User>;
  name: Scalars['String'];
};

export type TeamInput = {
  id: Scalars['Int'];
  issues: Array<IssueInput>;
  name: Scalars['String'];
  noOfIssues: Scalars['Int'];
  users: Array<UserInput>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  issues?: Maybe<Array<Issue>>;
  name: Scalars['String'];
  team: Team;
};

export type UserInput = {
  id?: InputMaybe<Scalars['Int']>;
  issues: Array<IssueInput>;
  name: Scalars['String'];
};

export type GetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, team: { __typename?: 'Team', id: string, name: string } }>, issues: Array<{ __typename?: 'Issue', id: string, name: string, user: { __typename?: 'User', id: string, name: string }, team: { __typename?: 'Team', id: string, name: string } }>, teams: Array<{ __typename?: 'Team', id: string, name: string, members: Array<{ __typename?: 'User', id: string, name: string }>, issues: Array<{ __typename?: 'Issue', id: string, name: string }> }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, team: { __typename?: 'Team', id: string, name: string } }> };


export const GetDataDocument = gql`
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
export const GetUsersDocument = gql`
    query getUsers {
  users {
    id
    name
    team {
      id
      name
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getData(variables?: GetDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDataQuery>(GetDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getData', 'query');
    },
    getUsers(variables?: GetUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUsers', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;