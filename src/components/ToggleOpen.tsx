import React, { useContext } from "react";
import { Button } from "react-native";
import styled from "styled-components/native";
import LikeSvg from "../images/like.svg";
import { AppContext } from "../components/AppContext";
import { Card } from "./Card";
import { TextStyles } from "./TextStyles";

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
      {isOpen && <TextStyles>OPEN</TextStyles>}
    </Card>
  );
}
const StyledLikeSvg = styled(LikeSvg)`
  color: ${(props) => props.theme.colors.foreground};
`;
