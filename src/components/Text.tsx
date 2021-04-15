import React from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import styled, { DefaultThemeColours } from "styled-components/native";

export default function Text({
  children,
  styles,
  // colour = "foreground",
  colour = "secondary",
}: {
  children: React.ReactNode;
  styles?: StyleProp<TextStyle>;
  colour?: keyof DefaultThemeColours;
} & Omit<RNTextProps, "style">): JSX.Element {
  return (
    <RNTextStyles style={[styles]} colour={colour}>
      {children}
    </RNTextStyles>
  );
}
const RNTextStyles = styled(RNText)<{ colour: keyof DefaultThemeColours }>`
  color: ${(props) => props.theme.colors[props.colour]};
`;
