import { gql } from "@apollo/client";

export const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    allUsers {
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
