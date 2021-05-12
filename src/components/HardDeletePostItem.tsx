import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Button } from "react-native";
import { Id, SilentAny } from "../state/types";

const HARD_DELETE_POST_MUTATION = gql`
  mutation HARD_DELETE_POST_MUTATION($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`;

const update = (cache: SilentAny, payload: SilentAny) => {
  // console.log(payload);
  // console.log("running update after deletePost mutation");
  cache.evict(cache.identify(payload.data.deletePost));
};

export const HardDeletePostItem = ({ id }: { id: Id }): JSX.Element => {
  const [deletePost, { loading, error }] = useMutation(
    HARD_DELETE_POST_MUTATION,
    {
      variables: { id },
      update,
      // refetchQueries: [
      //   {
      //     query: ALL_POSTS_QUERY,
      //   },
      // ],
    },
  );

  return (
    <Button
      title="Hard delete"
      disabled={loading}
      onPress={async () => {
        try {
          await deletePost();
        } catch {
          console.error("deletePost error: ", error);
        }
      }}
    />
  );
};
