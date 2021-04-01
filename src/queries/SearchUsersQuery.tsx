import { gql } from "@apollo/client";

export const SEARCH_USERS_QUERY = gql`
  query SEARCH_USERS_QUERY($searchTerm: String!) {
    allUsers(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          # { name_contains_i: $searchTerm },
        ]
      }
    ) {
      id
      name
      profileImage {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;
