import { useQuery } from "@apollo/client";
import { User } from "../state/user.model";
import { CURRENT_USER_QUERY } from "../queries/CurrentUserQuery";

export const useUser = (): {
  authenticatedUser: User;
} => {
  const {
    data,
    // , loading, error
  } = useQuery(CURRENT_USER_QUERY);

  // console.log("useUser data.authenticatedUser: ", data.authenticatedUser);

  // if there is data return the authenticatedItem, if not return undefined
  return data?.authenticatedUser;
};
