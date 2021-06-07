import { gql } from "@apollo/client";

export const MESSAGE_ITEM_QUERY = gql`
  query MESSAGE_ITEM_QUERY($conversationId: ID!) {
    allMessages(where: { conversation: { id: $conversationId } }) {
      id
      text
    }
  }
`;
