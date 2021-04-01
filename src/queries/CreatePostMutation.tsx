import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION(
    $title: String!
    $body: String! # $author: String!
  ) {
    createPost(
      data: {
        title: $title
        body: $body
        # author: $author
      }
    ) {
      id
      title
    }
  }
`;
