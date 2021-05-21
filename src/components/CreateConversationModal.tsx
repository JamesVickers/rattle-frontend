import React from "react";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { User } from "../state/user.model";
import { CloseIcon } from "./CloseIcon";
import { CreateConversationForm } from "./CreateConversationForm";
import { UserSearch } from "./UserSeach";

export const CreateConversationModal = ({
  isVisible,
  onClose,
  selectedUser,
  onSelectUser,
}: {
  isVisible: boolean;
  onClose?: () => void;
  selectedUser?: User;
  onSelectUser: (user: User) => void;
}): JSX.Element => {
  const insets = useSafeAreaInsets();

  const modalMarginTopStyle = React.useMemo(() => ({ marginTop: insets.top }), [
    insets.top,
  ]);

  return (
    <Modal
      presentationStyle="fullScreen"
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}>
      <ModalCard style={{ ...modalMarginTopStyle }}>
        <TouchableOpacity onPress={onClose}>
          <CloseIcon />
        </TouchableOpacity>
        <UserSearch onSelectUser={onSelectUser} />
        {selectedUser && <CreateConversationForm selectedUser={selectedUser} />}
      </ModalCard>
    </Modal>
  );
};
const ModalCard = styled.View`
  flex: 1
  background-color: ${(props) => props.theme.colors.secondary};
  border-top-left-radius: ${(props) => props.theme.borderRadius.modal}px;
  border-top-right-radius: ${(props) => props.theme.borderRadius.modal}px;
`;
