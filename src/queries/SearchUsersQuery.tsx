import { gql } from "@apollo/client";

export const SEARCH_USERS_QUERY = gql`
  query SEARCH_USERS_QUERY($searchTerm: String!) {
    allUsers(
      where: {
        OR: [
          { firstName_contains_i: $searchTerm }
          { lastName_contains_i: $searchTerm }
        ]
      }
    ) {
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
