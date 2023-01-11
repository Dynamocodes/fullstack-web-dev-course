import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
mutation signin(
    $username: String!,
    $password: String!){
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;