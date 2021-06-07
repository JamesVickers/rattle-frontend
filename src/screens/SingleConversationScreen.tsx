import { useMutation, useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, Button } from "react-native";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Card } from "../components/Card";
import { TextInput } from "../components/TextInput";
import { Text } from "../components/Text";
import { ChatStackParams } from "../routes";
import { useForm } from "../utils/useForm";
import { Outer } from "../components/Outer";
import { CONVERSATION_ITEM_QUERY } from "../queries/ConversationItemQuery";
import { UPDATE_CONVERSATION_MUTATION } from "../queries/UpdateConversationMutation";
import { HardDeleteConversationItem } from "../components/HardDeleteConversationItem";
import { ALL_CONVERSATIONS_QUERY } from "../components/AllConversationsQuery";
import { useError } from "../utils/useError";
import { Spacer } from "../components/Spacer";
import { useTheme } from "styled-components/native";
import { ErrorBox } from "../components/ErrorBox";
import { MESSAGE_ITEM_QUERY } from "../queries/MessageItemQuery";
import { FlatList } from "react-native-gesture-handler";
import { MessageItem } from "../components/MessageItem";
import { CreateMessageForm } from "../components/CreateMessageForm";

export const SingleConversationScreen = (): JSX.Element => {
  const route = useRoute<RouteProp<ChatStackParams, "SingleConversation">>();
  const { id } = route.params;
  const navigation = useNavigation<
    StackNavigationProp<ChatStackParams, "SingleConversation">
  >();
  const theme = useTheme();

  const {
    data: conversationQueryData,
    loading: conversationQueryLoading,
    error: conversationQueryError,
  } = useQuery(CONVERSATION_ITEM_QUERY, {
    variables: { id },
  });

  const {
    data: messageQueryData,
    loading: messageQueryLoading,
    error: messageQueryError,
  } = useQuery(MESSAGE_ITEM_QUERY, {
    variables: { conversationId: id },
  });

  const {
    error: conversationconversationQueryError,
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

  const onMessageLongPress = useCallback(() => {
    return null;
  }, []);

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>SingleConversationItemScreen</Text>
        <Button title="goBack" onPress={() => navigation.goBack()} />
        {conversationconversationQueryError && (
          <>
            <>
              <Spacer />
              <ErrorBox
                error={conversationconversationQueryError}
                clearError={conversationQueryClearError}
              />
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
            <Text>Conversation id: {id}</Text>
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
          disabled={conversationQueryLoading || updateLoading}
          title="Update"
          onPress={async () => {
            try {
              // const res =
              const res = await updateConversation({
                variables: {
                  id: id,
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
          id={id}
          disabled={conversationQueryLoading || updateLoading}
        />
        {messageQueryLoading ? (
          <>
            <Spacer />
            <ActivityIndicator color={theme.colors.foreground} size="large" />
          </>
        ) : (
          <FlatList
            data={messageQueryData.allMessages}
            extraData={messageQueryData.allMessages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MessageItem message={item} onLongPress={onMessageLongPress} />
            )}
            ListEmptyComponent={
              <Text>There are no messages in this conversation yet</Text>
            }
          />
        )}
        <CreateMessageForm conversationId={id} />
      </Outer>
    </SafeAreaViewDefault>
  );
};
