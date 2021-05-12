import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styled from "styled-components/native";

export const Outer = ({
  style,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}): JSX.Element => {
  return <ViewStyled style={style}>{children}</ViewStyled>;
};
const ViewStyled = styled(View)`
  flex: 1;
  margin: ${(props) => props.theme.spacing[2]}px;
  background: ${(props) => props.theme.colors.background};
`;
