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
  return <ViewStyles style={style}>{children}</ViewStyles>;
};
const ViewStyles = styled(View)`
  flex: 1;
  margin: ${(props) => props.theme.spacing[2]}px;
`;
