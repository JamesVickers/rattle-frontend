import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Button } from "react-native";
import { Id } from "../state/types";

const HARD_DELETE_POST_MUTATION = gql`
  mutation HARD_DELETE_POST_MUTATION($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`;

export default function HardDeletePostItem({ id }: { id: Id }): JSX.Element {
  const [deletePost, { loading, error }] = useMutation(
    HARD_DELETE_POST_MUTATION,
    {
      variables: id,
    },
  );

  return (
    <Button
      title="Hard delete"
      disabled={loading}
      onPress={async () => {
        try {
          // const res =
          const res = await deletePost();
          console.log("deletePost res: ", res);
        } catch {
          console.error("deletePost error: ", error);
        }
      }}
    />
  );
}
