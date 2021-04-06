import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      id
      firstName
      lastName
    }
  }
`;
