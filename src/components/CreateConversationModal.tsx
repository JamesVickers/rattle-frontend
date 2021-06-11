import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { User } from "../state/user.model";
import { CloseIcon } from "./CloseIcon";
import { CreateConversationForm } from "./CreateConversationForm";
import { Modal } from "./Modal";
import { Text } from "./Text";
import { UserSearch } from "./UserSeach";

export const CreateConversationModal = ({
  visible,
  onClose,
  selectedUser,
  onSelectUser,
}: {
  visible: boolean;
  onClose?: () => void;
  selectedUser?: User;
  onSelectUser: (user: User) => void;
}): JSX.Element => {
  return (
    <Modal
      presentationStyle="fullScreen"
      animationType="slide"
      visible={visible}
      onClose={onClose}>
      <TouchableOpacity onPress={onClose}>
        <CloseIcon />
      </TouchableOpacity>
      <Text>Create conversation</Text>
      <UserSearch onSelectUser={onSelectUser} />
      {selectedUser && <CreateConversationForm selectedUser={selectedUser} />}
    </Modal>
  );
};
