import React from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
// import styled, { DefaultThemeColours } from "styled-components/native";
import styled from "styled-components/native";
import { MyColours } from "../styles/myTheme";

export default function Text({
  children,
  styles,
  // colour = "foreground",
  colour = "foreground",
}: {
  children: React.ReactNode;
  styles?: StyleProp<TextStyle>;
  // colour?: keyof DefaultThemeColours;
  colour?: keyof MyColours;
} & Omit<RNTextProps, "style">): JSX.Element {
  return (
    <RNTextStyles style={[styles]} colour={colour}>
      {children}
    </RNTextStyles>
  );
}
// const RNTextStyles = styled(RNText)<{ colour: keyof DefaultThemeColours }>`
//   color: ${(props) => props.theme.colors[props.colour]};
// `;
const RNTextStyles = styled(RNText)<{ colour: keyof MyColours }>`
  color: ${(props) => props.theme.colors[props.colour]};
`;
