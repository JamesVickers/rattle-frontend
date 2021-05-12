import React from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import styled from "styled-components/native";
import { MyColours } from "../styles/myTheme";

export const Text = ({
  children,
  style,
  colour = "foreground",
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  colour?: keyof MyColours;
} & Omit<RNTextProps, "style">): JSX.Element => {
  return (
    <RNTextStyled style={style} colour={colour}>
      {children}
    </RNTextStyled>
  );
};
const RNTextStyled = styled(RNText)<{ colour?: keyof MyColours }>`
  color: ${(props) =>
    props.colour ? props.theme.colors[props.colour] : "#171717"};
`;
export {};
