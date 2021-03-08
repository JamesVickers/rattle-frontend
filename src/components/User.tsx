import { gql, useQuery } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedUser {
      #   ... on User {
      id
      name
      #   }
    }
  }
`;

// export const CURRENT_USER_QUERY = gql`
//   query {
//     authenticatedUser {
//       id
//       name
//       email
//       # query other info about the user here e.g. user's posts
//     }
//   }
// `;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  console.log("currentUser data: ", data);
  // if there is data return the authenticatedItem, if not return undefined
  return data?.authenticatedUser;
}
