import { gql } from "@apollo/client";

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION(
    $conversationId: ID!
    $userId: ID!
    $text: String
  ) {
    createMessage(
      data: {
        conversation: { connect: { id: $conversationId } }
        user: { connect: { id: $userId } }
        text: $text
      }
    ) {
      text
    }
  }
`;
