import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "styled-components/native";

export const Card = ({
  style,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}): JSX.Element => {
  const theme = useTheme();
  const backgroundColor = { backgroundColor: theme.colors.card };

  return <View style={[style, backgroundColor]}>{children}</View>;
};

export const CardTouchable = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  return <CardStyled>{children}</CardStyled>;
};
const CardStyled = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.card};
`;
