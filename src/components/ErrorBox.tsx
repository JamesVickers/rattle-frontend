import { ApolloError } from "@apollo/client";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useTheme } from "styled-components/native";
import CloseSvg from "../images/close.svg";
import Spacer from "./Spacer";
import Text from "./Text";

export default function ErrorBox({
  error,
  clearError,
}: {
  error: ApolloError | undefined;
  clearError?: () => void;
}): JSX.Element {
  const theme = useTheme();

  return (
    // <Collapse isOpened={error ? true : false} style={style}>
    <TouchableOpacityStyled
      onPress={clearError || undefined}
      activeOpacity={theme.opacity.pressed}>
      <CloseSvg
        width={theme.spacing[5]}
        height={theme.spacing[5]}
        fill={theme.colors.background}
      />
      <Spacer height={1} />
      <Text colour="background" style={{ display: "flex" }}>
        {error?.message || "Oh no! Something went wrong, please try again."}
      </Text>
    </TouchableOpacityStyled>
    // </Collapse>
  );
}
const TouchableOpacityStyled = styled(TouchableOpacity)`
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing[2]}px;
  background-color: ${(props) => props.theme.colors.danger};
  border-radius: ${(props) => props.theme.borderRadius.card}px;
`;
