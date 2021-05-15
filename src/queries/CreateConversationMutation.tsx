import { gql } from "@apollo/client";

export const CREATE_CONVERSATION_MUTATION = gql`
  mutation CREATE_CONVERSATION_MUTATION(
    $title: String
    $member: UserRelateToOneInput!
  ) {
    createConversation(data: { title: $title, member: $member }) {
      id
      title
    }
  }
`;
