import { gql } from "@apollo/client";

export const UPDATE_CONVERSATION_MUTATION = gql`
  mutation UPDATE_CONVERSATION_MUTATION($id: ID!, $title: String!) {
    updatePost(id: $id, data: { title: $title }) {
      id
      title
    }
  }
`;
