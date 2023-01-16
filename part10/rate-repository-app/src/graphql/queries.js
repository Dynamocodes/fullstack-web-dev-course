import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
query($repositoryId: ID!){
  repository(id: $repositoryId) {
    id
    url
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  } 
}
`;
