import React, { useContext } from "react";
import { Button } from "react-native";
import { AppContext } from "../components/AppContext";
import { Card } from "./Card";
import { StyledLikeSvg } from "./LikeSvg";
import { Text } from "./Text";

export const ToggleOpen = (): JSX.Element => {
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
};
