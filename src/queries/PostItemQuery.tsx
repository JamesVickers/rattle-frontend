import { gql } from "@apollo/client";

export const POST_ITEM_QUERY = gql`
  query POST_ITEM_QUERY($id: ID!) {
    Post(where: { id: $id }) {
      id
      title
      body
      status
    }
  }
`;
