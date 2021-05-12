import React, { useState } from "react";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import { Text } from "../components/Text";
import styled from "styled-components/native";

export const HomeTab = (): JSX.Element => {
  // const navigation = useNavigation<
  //   CompositeNavigationProp<
  //     StackNavigationProp<ChatTabsParams, "Home">,
  //     StackNavigationProp<ChatStackParams>
  //   >
  // >();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>Home tab</Text>
        <Text>Flatlist of conversations to go here</Text>
        <Modal
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          {/* <BehindModal /> */}
          <ModalCard>
            <Text>Hello World!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </ModalCard>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
      </Outer>
    </SafeAreaViewDefault>
  );
};
const ModalCard = styled.View`
  margin-top: ${(props) => props.theme.spacing[10]}px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  border-top-left-radius: ${(props) => props.theme.borderRadius.modal}px;
  border-top-right-radius: ${(props) => props.theme.borderRadius.modal}px;
`;
// const BehindModal = styled.View`
//   position: absolute;
//   left: 0;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   background-color: ${(props) => props.theme.colors.secondary};
// `;
