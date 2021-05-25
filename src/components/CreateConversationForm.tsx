import { useMutation } from "@apollo/client";
import React from "react";
import { Button } from "react-native";
import { CREATE_CONVERSATION_MUTATION } from "../queries/CreateConversationMutation";
import { ALL_CONVERSATIONS_QUERY } from "./AllConversationsQuery";
import { useForm } from "../utils/useForm";
import { Card } from "./Card";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { User } from "../state/user.model";

export const CreateConversationForm = ({
  selectedUser,
}: {
  selectedUser: User;
}): JSX.Element => {
  // remove initial state in useForm custom hook if want no initial values and not using resetForm function
  const { inputs, handleChange, clearForm, clearIndividualKey } = useForm({
    title: "",
  });
  const [
    createConversation,
    {
      // data, loading,
      error,
    },
  ] = useMutation(CREATE_CONVERSATION_MUTATION, {
    variables: { ...inputs, memberId: selectedUser.id },
    refetchQueries: [
      {
        query: ALL_CONVERSATIONS_QUERY,
        // can pass variables to the refetchQuery here is needed
        // variables: { }
      },
    ],
  });

  return (
    <Card>
      <Text>Start a new conversation</Text>
      <TextInput
        value={inputs.title}
        handleChange={handleChange}
        name={"title"}
        placeholder={"Add a conversation title"}
        clearValue={clearIndividualKey}
      />
      <Text>Selected user: {selectedUser.firstName}</Text>
      <Button
        title="Start conversation"
        // disabled={!canCreateConversation}
        onPress={async () => {
          try {
            await createConversation();
            clearForm();
          } catch {
            console.error("createConversation error: ", error);
          }
        }}
      />
      <Button title="Clear form" onPress={clearForm} />
    </Card>
  );
};
