import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
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

export const HomeTab = (): JSX.Element => {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<ChatTabsParams, "Home">,
      StackNavigationProp<ChatStackParams>
    >
  >();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const {
    data: allConversationsData,
    loading: allConversationsLoading,
    error: allConversationsError,
  } = useQuery(ALL_CONVERSATIONS_QUERY);

  const onSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const onCloseModal = useCallback(() => {
    setModalVisible(false);
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
        <Text>Home tab</Text>
        <Text>Flatlist of conversations to go here</Text>
        {selectedUser && <Text>{selectedUser.firstName}</Text>}
        {allConversationsData && (
          <FlatList
            data={allConversationsData.allConversations}
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
