import React, { useContext } from "react";
import { Button, Text } from "react-native";
import styled, { useTheme } from "styled-components/native";
import LikeSvg from "../images/like.svg";
import { AppContext } from "../components/AppContext";
import { Card } from "./Card";

export default function ToggleOpen(): JSX.Element {
  const { isOpen, toggleOpen, openExample, closeExample } = useContext(
    AppContext,
  );

  const theme = useTheme();

  return (
    <Card>
      <StyledLikeSvg />
      <Button title="toggleOpen" onPress={toggleOpen} />
      <Button title="openExample" onPress={openExample} />
      <Button title="closeExample" onPress={closeExample} />
      {isOpen && <Text style={{ color: theme.colors.foreground }}>OPEN</Text>}
    </Card>
  );
}
const StyledLikeSvg = styled(LikeSvg)`
  color: ${(props) => props.theme.colors.foreground};
`;
