import React, { useCallback, useState } from "react";
import { Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import styled, { useTheme } from "styled-components/native";
import { User } from "../state/user.model";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import { Text } from "../components/Text";
import { UserSearch } from "../components/UserSeach";
import { CreateConversationForm } from "../components/CreateConversationForm";
import { ALL_CONVERSATIONS_QUERY } from "../components/AllConversationsQuery";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ConversationItem } from "../components/ConversationItem";
import { Conversation } from "../state/conversation.model";
import { CloseIcon } from "../components/CloseIcon";
import { CreateIcon } from "../components/CreateIcon";

export const HomeTab = (): JSX.Element => {
  // const navigation = useNavigation<
  //   CompositeNavigationProp<
  //     StackNavigationProp<ChatTabsParams, "Home">,
  //     StackNavigationProp<ChatStackParams>
  //   >
  // >();

  const insets = useSafeAreaInsets();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [
    selectedConversation,
    setSelectedConversation,
  ] = useState<Conversation>();

  const {
    data: allConversationsData,
    loading: allConversationsLoading,
    error: allConversationsError,
  } = useQuery(ALL_CONVERSATIONS_QUERY);

  const onSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const onSelectConversation = useCallback((conversation: Conversation) => {
    setSelectedConversation(conversation);
  }, []);

  const modalMarginTopStyle = React.useMemo(() => ({ marginTop: insets.top }), [
    insets.top,
  ]);

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>Home tab</Text>
        <Text>Flatlist of conversations to go here</Text>
        {selectedUser && <Text>{selectedUser.firstName}</Text>}
        {selectedConversation && (
          <Text>{selectedConversation.title || "no title"}</Text>
        )}
        {allConversationsData && (
          <FlatList
            data={allConversationsData.allConversations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ConversationItem
                key={item.id}
                conversation={item}
                onSelectConversation={onSelectConversation}
              />
            )}
            ListEmptyComponent={<Text>No user matched found</Text>}
          />
        )}

        <Modal
          presentationStyle="fullScreen"
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <ModalCard style={{ ...modalMarginTopStyle }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
            <UserSearch onSelectUser={onSelectUser} />
            {selectedUser && (
              <CreateConversationForm selectedUser={selectedUser} />
            )}
          </ModalCard>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <CreateIcon />
        </TouchableOpacity>
      </Outer>
    </SafeAreaViewDefault>
  );
};
const ModalCard = styled.View`
  flex: 1
  background-color: ${(props) => props.theme.colors.secondary};
  border-top-left-radius: ${(props) => props.theme.borderRadius.modal}px;
  border-top-right-radius: ${(props) => props.theme.borderRadius.modal}px;
`;
