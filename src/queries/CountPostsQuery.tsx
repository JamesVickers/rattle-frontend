import { gql } from "@apollo/client";

export const COUNT_POST_QUERY = gql`
  query COUNT_POST_QUERY {
    _allPostsMeta {
      count
    }
  }
`;
