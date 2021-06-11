import React from "react";
import { Modal as RNModal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { ModalAnimationType, ModalPresentationStyle } from "../state/types";

export const Modal = ({
  children,
  visible,
  onClose,
  animationType,
  presentationStyle,
}: {
  children?: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  animationType: ModalAnimationType;
  presentationStyle: ModalPresentationStyle;
}): JSX.Element => {
  const insets = useSafeAreaInsets();

  const modalMarginTopStyle = React.useMemo(() => ({ marginTop: insets.top }), [
    insets.top,
  ]);

  return (
    <RNModal
      presentationStyle={presentationStyle}
      animationType={animationType}
      visible={visible}
      onRequestClose={onClose}>
      <ModalCardStyled style={{ ...modalMarginTopStyle }}>
        {children}
      </ModalCardStyled>
    </RNModal>
  );
};
const ModalCardStyled = styled.View`
  flex: 1
  background-color: ${(props) => props.theme.colors.secondary};
  border-top-left-radius: ${(props) => props.theme.borderRadius.modal}px;
  border-top-right-radius: ${(props) => props.theme.borderRadius.modal}px;
`;
