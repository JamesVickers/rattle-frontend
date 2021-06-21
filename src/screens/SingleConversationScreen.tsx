import { useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Text } from "../components/Text";
import { ChatStackParams } from "../routes";
import { Outer } from "../components/Outer";
import { CONVERSATION_ITEM_QUERY } from "../queries/ConversationItemQuery";
import { useError } from "../utils/useError";
import { Spacer } from "../components/Spacer";
import { useTheme } from "styled-components/native";
import { ErrorBox } from "../components/ErrorBox";
import { MESSAGE_ITEM_QUERY } from "../queries/MessageItemQuery";
import { FlatList } from "react-native-gesture-handler";
import { MessageItem } from "../components/MessageItem";
import { CreateMessageForm } from "../components/CreateMessageForm";
import { EditConversationModal } from "../components/EditConversationModal";
import styled from "styled-components/native";
import { RowSeparatorWithSpacers } from "../components/ItemSeparators";
import { ChevronBackIcon } from "../components/ChevronBackIcon";
import { EllipsisIcon } from "../components/EllipsisIcon";

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

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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

  const onMessageLongPress = useCallback(() => {
    return null;
  }, []);

  return (
    <SafeAreaViewDefault>
      <Outer>
        <HeaderRow>
          <ChevronBackIcon onPress={onGoBack} />
          {conversationQueryLoading ? (
            <>
              <Spacer />
              <ActivityIndicator color={theme.colors.foreground} size="large" />
            </>
          ) : (
            <>
              <ConversationTitle>
                {conversationQueryData?.Conversation.title}
              </ConversationTitle>
              <EllipsisIcon onPress={onOpenModal} />
              {/* </ConversationTitleRow> */}
            </>
          )}
        </HeaderRow>
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
            ItemSeparatorComponent={RowSeparatorWithSpacers}
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
        conversation={conversationQueryData?.Conversation}
      />
    </SafeAreaViewDefault>
  );
};
const HeaderRow = styled.View`
  flex-direction: row;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ConversationTitle = styled(Text)`
  padding: 0 ${(props) => props.theme.spacing[1]}px;
  flex-wrap: wrap;
  flex: 1;
  text-align: center;
`;
