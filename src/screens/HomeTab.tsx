import React, { useCallback, useState } from "react";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import { Text } from "../components/Text";
import { UserSearch } from "../components/UserSeach";
import { User } from "../state/user.model";
import { CreateConversation } from "../components/CreateConversation";

export const HomeTab = (): JSX.Element => {
  // const navigation = useNavigation<
  //   CompositeNavigationProp<
  //     StackNavigationProp<ChatTabsParams, "Home">,
  //     StackNavigationProp<ChatStackParams>
  //   >
  // >();
  // const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const onSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>Home tab</Text>
        <Text>Flatlist of conversations to go here</Text>
        {selectedUser && <Text>{selectedUser.firstName}</Text>}
        <UserSearch onSelectUser={onSelectUser} />
        {selectedUser && <CreateConversation selectedUser={selectedUser} />}
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
