import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useTheme } from "styled-components/native";
import { Id, SilentAny } from "../state/types";
import { ALL_CONVERSATIONS_QUERY } from "./AllConversationsQuery";
import { Button } from "./Button";

const HARD_DELETE_CONVERSATION_MUTATION = gql`
  mutation HARD_DELETE_CONVERSATION_MUTATION($id: ID!) {
    deleteConversation(id: $id) {
      id
      title
    }
  }
`;

const update = (cache: SilentAny, payload: SilentAny) => {
  // console.log(payload);
  // console.log("running update after deleteConversation mutation");
  cache.evict(cache.identify(payload.data.deleteConversation));
};

export const HardDeleteConversationItem = ({
  id,
  disabled,
}: {
  id: Id;
  disabled: boolean;
}): JSX.Element => {
  const theme = useTheme();

  const [deleteConversation, { loading, error }] = useMutation(
    HARD_DELETE_CONVERSATION_MUTATION,
    {
      variables: { id },
      update,
      refetchQueries: [
        {
          query: ALL_CONVERSATIONS_QUERY,
        },
      ],
    },
  );

  return (
    <Button
      text="Delete conversation"
      touchableStyle={{
        backgroundColor: theme.colors.danger,
      }}
      disabled={loading || disabled}
      onPress={async () => {
        try {
          await deleteConversation();
        } catch {
          console.error("deleteConversation error: ", error);
        }
      }}
    />
  );
};
