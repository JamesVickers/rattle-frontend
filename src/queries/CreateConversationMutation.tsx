import { gql } from "@apollo/client";

export const CREATE_CONVERSATION_MUTATION = gql`
  mutation CREATE_CONVERSATION_MUTATION($title: String, $memberId: ID!) {
    createConversation(
      data: { title: $title, member: { connect: { id: $memberId } } }
    ) {
      title
    }
  }
`;
