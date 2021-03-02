import { gql } from "@apollo/client";

export const ALL_POSTS_QUERY = gql`
  query {
    allPosts {
      id
      title
      body
      status
      author {
        id
        name
        profileImage {
          image {
            id
            publicUrlTransformed
          }
        }
      }
    }
  }
`;
