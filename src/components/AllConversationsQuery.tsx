import { gql } from "@apollo/client";

export const ALL_CONVERSATIONS_QUERY = gql`
  query ALL_CONVERSATIONS_QUERY {
    allConversations {
      id
      title
      member {
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
  }
`;
