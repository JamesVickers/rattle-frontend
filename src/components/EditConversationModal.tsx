import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Card } from "../components/Card";
import { TextInput } from "../components/TextInput";
import { Text } from "../components/Text";
import { useForm } from "../utils/useForm";
import { UPDATE_CONVERSATION_MUTATION } from "../queries/UpdateConversationMutation";
import { HardDeleteConversationItem } from "../components/HardDeleteConversationItem";
import { ALL_CONVERSATIONS_QUERY } from "../components/AllConversationsQuery";
import { useError } from "../utils/useError";
import { Spacer } from "../components/Spacer";
import { useTheme } from "styled-components/native";
import { ErrorBox } from "../components/ErrorBox";
import { Button } from "../components/Button";
import { Modal } from "./Modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CloseIcon } from "./CloseIcon";
import { Conversation } from "../state/conversation.model";

export const EditConversationModal = ({
  visible,
  onClose,
  conversation,
}: {
  visible: boolean;
  onClose?: () => void;
  conversation: Conversation;
}): JSX.Element => {
  const theme = useTheme();

  console.log("conversation: ", conversation);

  const [
    updateConversation,
    {
      // data: updateData,
      error: updateError,
      loading: updateLoading,
    },
  ] = useMutation(UPDATE_CONVERSATION_MUTATION);

  const {
    error: conversationUpdateError,
    handleError: conversationUpdateHandleError,
    clearError: conversationUpdateClearError,
  } = useError();

  useEffect(() => {
    // if graphql error changes, update useError hook
    conversationUpdateHandleError(updateError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateError]);

  const { inputs, handleChange, clearIndividualKey } = useForm({
    title: conversation.title,
  });
  return (
    <Modal
      presentationStyle="fullScreen"
      animationType="slide"
      visible={visible}
      onClose={onClose}>
      <TouchableOpacity onPress={onClose}>
        <CloseIcon />
      </TouchableOpacity>
      <Text>Edit conversation: {conversation.id}</Text>
      {conversationUpdateError && (
        <>
          <>
            <Spacer />
            <ErrorBox
              error={conversationUpdateError}
              clearError={conversationUpdateClearError}
            />
          </>
        </>
      )}
      {updateLoading ? (
        <>
          <Spacer />
          <ActivityIndicator color={theme.colors.foreground} size="large" />
        </>
      ) : (
        <>
          <Spacer />
          <Text>Update the conversation title</Text>
          <Card>
            <TextInput
              value={inputs.title}
              handleChange={handleChange}
              name={"title"}
              placeholder={"Add the conversation title"}
              clearValue={clearIndividualKey}
            />
          </Card>
        </>
      )}
      <Button
        text="Update"
        disabled={updateLoading}
        onPress={async () => {
          try {
            // const res =
            const res = await updateConversation({
              variables: {
                id: conversation.id,
                title: inputs.title,
                refetchQueries: [
                  {
                    query: ALL_CONVERSATIONS_QUERY,
                    // can pass variables to the refetchQuery here is needed
                    // variables: { }
                  },
                ],
              },
            });
            console.log("updateConversation res: ", res);
          } catch {
            conversationUpdateHandleError(updateError);
          }
        }}
      />
      <HardDeleteConversationItem
        id={conversation.id}
        disabled={updateLoading}
      />
    </Modal>
  );
};
