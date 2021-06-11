import { useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import EllipsisSvg from "../images/ellipsis.svg";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Card } from "../components/Card";
import { TextInput } from "../components/TextInput";
import { Text } from "../components/Text";
import { ChatStackParams } from "../routes";
import { useForm } from "../utils/useForm";
import { Outer } from "../components/Outer";
import { CONVERSATION_ITEM_QUERY } from "../queries/ConversationItemQuery";
import { useError } from "../utils/useError";
import { Spacer } from "../components/Spacer";
import { useTheme } from "styled-components/native";
import { ErrorBox } from "../components/ErrorBox";
import { MESSAGE_ITEM_QUERY } from "../queries/MessageItemQuery";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { MessageItem } from "../components/MessageItem";
import { CreateMessageForm } from "../components/CreateMessageForm";
import { Button } from "../components/Button";
import { EditConversationModal } from "../components/EditConversationModal";

export const SingleConversationScreen = (): JSX.Element => {
  const route = useRoute<RouteProp<ChatStackParams, "SingleConversation">>();
  const { id } = route.params;
  const navigation = useNavigation<
    StackNavigationProp<ChatStackParams, "SingleConversation">
  >();
  const theme = useTheme();

  const [isModalVisible, setModalVisible] = useState(false);

  const onOpenModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

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

  const { inputs, handleChange, clearIndividualKey } = useForm({
    title: conversationQueryData?.Conversation.title,
  });

  const onMessageLongPress = useCallback(() => {
    return null;
  }, []);

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Button text="goBack" onPress={() => navigation.goBack()} />
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
        {conversationQueryLoading ? (
          <>
            <Spacer />
            <ActivityIndicator color={theme.colors.foreground} size="large" />
          </>
        ) : (
          <>
            <Spacer />
            <Text>{conversationQueryData?.Conversation.title}</Text>
            <TouchableOpacity onPress={onOpenModal}>
              <EllipsisSvg
                // style={s.alignSelfEnd}
                width={theme.spacing[6]}
                height={theme.spacing[6]}
                fill={theme.colors.icon}
              />
            </TouchableOpacity>
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
      <EditConversationModal
        visible={isModalVisible}
        onClose={onCloseModal}
        conversationId={id}
      />
    </SafeAreaViewDefault>
  );
};
