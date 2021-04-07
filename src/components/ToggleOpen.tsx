import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import styled from "styled-components";
import LikeSvg from "../images/like.svg";
import { AppContext } from "../components/AppContext";

export default function ToggleOpen(): JSX.Element {
  const { isOpen, toggleOpen, openExample, closeExample } = useContext(
    AppContext,
  );

  return (
    <View style={{ backgroundColor: "white" }}>
      <StyledLikeSvg />
      <Button title="toggleOpen" onPress={toggleOpen} />
      <Button title="openExample" onPress={openExample} />
      <Button title="closeExample" onPress={closeExample} />
      {isOpen && <Text>OPEN</Text>}
    </View>
  );
}
const StyledLikeSvg = styled(LikeSvg)`
  color: ${(props) => props.theme.colors.foreground};
`;
