import { useMutation, useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
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

export const SingleConversationScreen = (): JSX.Element => {
  const route = useRoute<RouteProp<ChatStackParams, "SingleConversation">>();
  const { id } = route.params;
  const navigation = useNavigation<
    StackNavigationProp<ChatStackParams, "SingleConversation">
  >();
  const theme = useTheme();

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(CONVERSATION_ITEM_QUERY, {
    variables: { id },
  });

  const {
    error: conversationQueryError,
    handleError: conversationQueryHandleError,
    clearError: conversationQueryClearError,
  } = useError();

  useEffect(() => {
    // if graphql error changes, update useError hook
    conversationQueryHandleError(queryError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryError]);

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
    title: queryData?.Conversation.title,
  });

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>SingleConversationItemScreen</Text>
        <Button title="goBack" onPress={() => navigation.goBack()} />
        {conversationQueryError && (
          <>
            <>
              <Spacer />
              <ErrorBox
                error={conversationQueryError}
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
        {queryLoading || updateLoading ? (
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
          disabled={queryLoading || updateLoading}
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
          disabled={queryLoading || updateLoading}
        />
      </Outer>
    </SafeAreaViewDefault>
  );
};
