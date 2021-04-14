import { gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedUser {
      #   ... on User {
      id
      firstName
      lastName
      profileImage {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;
