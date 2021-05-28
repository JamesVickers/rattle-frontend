import { gql } from "@apollo/client";

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation UPDATE_MESSAGE_MUTATION(
    $conversationId: ID!
    $userId: ID!
    $text: string
  ) {
    updateMessage(
      id: $id
      data: {
        conversation: { connect: { id: $conversationId } }
        user: { connect: { id: $userId } }
        text: $text
      }
    ) {
      conversation
      body
    }
  }
`;
