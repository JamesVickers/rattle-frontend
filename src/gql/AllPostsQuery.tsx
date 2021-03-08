import { gql } from "@apollo/client";

export const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY {
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
