import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
