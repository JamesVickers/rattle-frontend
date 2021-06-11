import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Card } from "../components/Card";
import { TextInput } from "../components/TextInput";
import { Text } from "../components/Text";
import { useForm } from "../utils/useForm";
import { CONVERSATION_ITEM_QUERY } from "../queries/ConversationItemQuery";
import { UPDATE_CONVERSATION_MUTATION } from "../queries/UpdateConversationMutation";
import { HardDeleteConversationItem } from "../components/HardDeleteConversationItem";
import { ALL_CONVERSATIONS_QUERY } from "../components/AllConversationsQuery";
import { useError } from "../utils/useError";
import { Spacer } from "../components/Spacer";
import { useTheme } from "styled-components/native";
import { ErrorBox } from "../components/ErrorBox";
import { Button } from "../components/Button";
import { Id } from "../state/types";
import { Modal } from "./Modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CloseIcon } from "./CloseIcon";

export const EditConversationModal = ({
  visible,
  onClose,
  conversationId,
}: {
  visible: boolean;
  onClose?: () => void;
  conversationId: Id;
}): JSX.Element => {
  const theme = useTheme();

  const {
    data: conversationQueryData,
    loading: conversationQueryLoading,
    error: conversationQueryError,
  } = useQuery(CONVERSATION_ITEM_QUERY, {
    variables: { conversationId },
  });

  console.log("conversationId: ", conversationId);
  console.log("conversationQueryData: ", conversationQueryData);
  console.log("conversationQueryLoading: ", conversationQueryLoading);
  console.log("conversationQueryError: ", conversationQueryError);

  const {
    error: error,
    handleError: conversationQueryHandleError,
    clearError: conversationQueryClearError,
  } = useError();

  useEffect(() => {
    // if graphql error changes, update useError hook
    conversationQueryHandleError(conversationQueryError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationQueryError]);

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
    title: conversationQueryData?.Conversation.title,
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
      <Text>Edit conversation: {conversationId}</Text>
      {error && (
        <>
          <>
            <Spacer />
            <ErrorBox error={error} clearError={conversationQueryClearError} />
          </>
        </>
      )}
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
      {conversationQueryLoading || updateLoading ? (
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
        disabled={conversationQueryLoading || updateLoading}
        onPress={async () => {
          try {
            // const res =
            const res = await updateConversation({
              variables: {
                id: conversationId,
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
        id={conversationId}
        disabled={conversationQueryLoading || updateLoading}
      />
    </Modal>
  );
};
