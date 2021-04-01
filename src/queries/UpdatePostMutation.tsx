import { gql } from "@apollo/client";

export const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($id: ID!, $title: String!, $body: String!) {
    updatePost(id: $id, data: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;
