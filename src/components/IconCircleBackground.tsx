import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { MyColours } from "../styles/myTheme";

export const IconCircleBackground = ({
  style,
  children,
  background,
}: {
  style?: StyleProp<ViewStyle>;
  background?: keyof MyColours;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <IconCircleStyled style={style} background={background}>
      {children}
    </IconCircleStyled>
  );
};
const IconCircleStyled = styled(View)<{ background?: keyof MyColours }>`
  background: ${(props) => props.theme.colors[props.background || "primary"]};
  padding: ${(props) => props.theme.spacing[1]}px;
  border-radius: ${(props) => props.theme.borderRadius.circle}px;
`;
