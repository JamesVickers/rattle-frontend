import { useMutation } from "@apollo/client";
import React from "react";
import { Button } from "react-native";
import { useForm } from "../utils/useForm";
import { Card } from "./Card";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { CREATE_MESSAGE_MUTATION } from "../queries/CreateMessageMutation";
import { MESSAGE_ITEM_QUERY } from "../queries/MessageItemQuery";
import { useUser } from "./User";
import { Id } from "../state/types";

export const CreateMessageForm = ({
  conversationId,
}: {
  conversationId: Id;
}): JSX.Element => {
  const user = useUser();

  // remove initial state in useForm custom hook if want no initial values and not using resetForm function
  const { inputs, handleChange, clearForm, clearIndividualKey } = useForm({
    text: "",
  });

  const [
    createMessage,
    {
      data: createMessageData,
      loading: createMessageLoading,
      error: creatteMessageError,
    },
  ] = useMutation(CREATE_MESSAGE_MUTATION, {
    variables: { conversationId, userId: user.id, ...inputs },
    refetchQueries: [
      {
        query: MESSAGE_ITEM_QUERY,
        variables: { conversationId },
      },
    ],
  });

  return (
    <Card>
      <Text>Create a new message</Text>
      <TextInput
        value={inputs.text}
        handleChange={handleChange}
        name={"text"}
        placeholder={"Message text here..."}
        clearValue={clearIndividualKey}
      />
      <Button
        title="Send message"
        // disabled={!canCreateConversation}
        onPress={async () => {
          try {
            await createMessage();
            clearForm();
          } catch {
            console.error("createMessage error: ", creatteMessageError);
          }
        }}
      />
      <Button title="Clear form" onPress={clearForm} />
    </Card>
  );
};
