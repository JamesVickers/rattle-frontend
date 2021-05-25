import { gql } from "@apollo/client";

export const COUNT_CONVERSATIONS_QUERY = gql`
  query COUNT_CONVERSATIONS_QUERY {
    _allConversationsMeta {
      count
    }
  }
`;
