import React, { useContext } from "react";
import { Button, Text } from "react-native";
import styled from "styled-components";
import LikeSvg from "../images/like.svg";
import { AppContext } from "../components/AppContext";
import { Card } from "./Card";

export default function ToggleOpen(): JSX.Element {
  const { isOpen, toggleOpen, openExample, closeExample } = useContext(
    AppContext,
  );

  return (
    <Card>
      <StyledLikeSvg />
      <Button title="toggleOpen" onPress={toggleOpen} />
      <Button title="openExample" onPress={openExample} />
      <Button title="closeExample" onPress={closeExample} />
      {isOpen && <Text>OPEN</Text>}
    </Card>
  );
}
const StyledLikeSvg = styled(LikeSvg)`
  color: ${(props) => props.theme.colors.foreground};
`;
