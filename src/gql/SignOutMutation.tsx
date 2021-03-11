import { gql } from "@apollo/client";

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    unauthenticateUser {
      success
    }
  }
`;
// export const SIGN_OUT_MUTATION = gql`
//   mutation SIGN_OUT_MUTATION {
//     endSession
//   }
// `;
