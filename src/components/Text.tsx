import React from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import styled from "styled-components/native";
import { MyColours } from "../styles/myTheme";

export default function Text({
  children,
  style,
  // colour = "foreground",
  colour,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  colour?: keyof MyColours;
  // colour?: string;
} & Omit<RNTextProps, "style">): JSX.Element {
  return (
    <RNTextStyled style={style} colour={colour}>
      {children}
    </RNTextStyled>
  );
}
const RNTextStyled = styled(RNText)<{ colour?: keyof MyColours }>`
  color: ${(props) =>
    props.colour ? props.theme.colors[props.colour] : "#171717"};
`;
export {};
