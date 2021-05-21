import { gql } from "@apollo/client";

export const CONVERSATION_ITEM_QUERY = gql`
  query CONVERSATION_ITEM_QUERY($id: ID!) {
    Conversation(where: { id: $id }) {
      id
      title
    }
  }
`;
