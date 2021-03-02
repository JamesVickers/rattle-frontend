import { gql } from "@apollo/client";

export const POST_ITEM_QUERY = gql`
  query {
    Post(where: { id: "602e81986e52282eda8fb576" }) {
      id
      title
      body
      status
    }
  }
`;
