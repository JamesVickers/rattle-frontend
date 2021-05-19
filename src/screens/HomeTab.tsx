import React, { useCallback, useState } from "react";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import { Text } from "../components/Text";
import { UserSearch } from "../components/UserSeach";
import { User } from "../state/user.model";
import { CreateConversationForm } from "../components/CreateConversationForm";
import { ALL_CONVERSATIONS_QUERY } from "../components/AllConversationsQuery";
import { useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import { ConversationItem } from "../components/ConversationItem";
import { Conversation } from "../state/conversation.model";

export const HomeTab = (): JSX.Element => {
  // const navigation = useNavigation<
  //   CompositeNavigationProp<
  //     StackNavigationProp<ChatTabsParams, "Home">,
  //     StackNavigationProp<ChatStackParams>
  //   >
  // >();
  // const [isModalVisible, setModalVisible] = useState(false);
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

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>Home tab</Text>
        <Text>Flatlist of conversations to go here</Text>
        {selectedUser && <Text>{selectedUser.firstName}</Text>}
        {selectedConversation && (
          <Text>{selectedConversation.title || "no title"}</Text>
        )}
        <UserSearch onSelectUser={onSelectUser} />
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
        {selectedUser && <CreateConversationForm selectedUser={selectedUser} />}
        {/* <Modal
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          {/* <BehindModal /> 
          <ModalCard>
            <Text>Hello World!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </ModalCard>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>Show Modal</Text>
        </TouchableOpacity> */}
      </Outer>
    </SafeAreaViewDefault>
  );
};
// const ModalCard = styled.View`
//   margin-top: ${(props) => props.theme.spacing[10]}px;
//   height: 100%;
//   background-color: ${(props) => props.theme.colors.primary};
//   border-top-left-radius: ${(props) => props.theme.borderRadius.modal}px;
//   border-top-right-radius: ${(props) => props.theme.borderRadius.modal}px;
// `;
// const BehindModal = styled.View`
//   position: absolute;
//   left: 0;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   background-color: ${(props) => props.theme.colors.secondary};
// `;
