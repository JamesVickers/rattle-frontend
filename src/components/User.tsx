import { gql, useQuery } from "@apollo/client";
import { User } from "../state/user.model";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedUser {
      #   ... on User {
      id
      name
      # query other info about the user here e.g. user's posts
      #   }
    }
  }
`;

export function useUser(): {
  authenticatedUser: User;
} {
  const {
    data,
    // , loading, error
  } = useQuery(CURRENT_USER_QUERY);

  // console.log("useUser data.authenticatedUser: ", data.authenticatedUser);

  // if there is data return the authenticatedItem, if not return undefined
  return data?.authenticatedUser;
}
