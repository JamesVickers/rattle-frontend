import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useTheme } from "styled-components/native";
import { ChatStackParams, ChatTabsParams } from "../routes";
import { Id } from "../state/types";
import { User } from "../state/user.model";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import { Text } from "../components/Text";
import { ALL_CONVERSATIONS_QUERY } from "../components/AllConversationsQuery";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ConversationItem } from "../components/ConversationItem";
import { CreateIcon } from "../components/CreateIcon";
import { CreateConversationModal } from "../components/CreateConversationModal";
import { Spacer } from "../components/Spacer";
import { ActivityIndicator } from "react-native";
import { Conversation } from "../state/conversation.model";
import { ErrorBox } from "../components/ErrorBox";
import { useError } from "../utils/useError";

export const HomeTab = (): JSX.Element => {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<ChatTabsParams, "Home">,
      StackNavigationProp<ChatStackParams>
    >
  >();
  const theme = useTheme();

  const { error, handleError, clearError } = useError();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [conversations, setConversation] = useState<Conversation[]>();

  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
  } = useQuery(ALL_CONVERSATIONS_QUERY);

  useEffect(() => {
    // create new conversations array to trigger rerender of FlatList via extraData prop
    // this is triggered when either creating a new conversation or updating an existing conversation
    setConversation([...conversationsData.allConversations]);
  }, [conversationsData.allConversations]);

  useEffect(() => {
    // if graphql error changes, update useError hook
    handleError(conversationsError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationsError]);

  const onSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const onCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedUser(undefined);
  }, []);

  const goToConversationItemScreen = useCallback(
    (selectedConversationId: Id) => {
      navigation.navigate("SingleConversation", { id: selectedConversationId });
    },
    [navigation],
  );

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>Home</Text>
        {selectedUser && <Text>{selectedUser.firstName}</Text>}
        {error && (
          <>
            <>
              <Spacer />
              <ErrorBox error={error} clearError={clearError} />
              <Spacer />
            </>
          </>
        )}
        {conversationsLoading ? (
          <>
            <Spacer />
            <ActivityIndicator color={theme.colors.foreground} size="large" />
          </>
        ) : (
          conversations && (
            <FlatList
              data={conversations}
              extraData={conversations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ConversationItem
                  key={item.id}
                  conversation={item}
                  onConversationPress={goToConversationItemScreen}
                />
              )}
              ListEmptyComponent={<Text>No user matched found</Text>}
            />
          )
        )}
        <CreateConversationModal
          isVisible={isModalVisible}
          onClose={onCloseModal}
          selectedUser={selectedUser}
          onSelectUser={onSelectUser}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <CreateIcon />
        </TouchableOpacity>
      </Outer>
    </SafeAreaViewDefault>
  );
};
