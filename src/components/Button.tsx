import React from "react";
import { StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Button = ({
  touchableStyle,
  textStyle,
  children,
  text,
  disabled,
  onPress,
  onLongPress,
}: {
  touchableStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  text?: string;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}): JSX.Element => {
  return (
    <TouchableWithoutFeedbackStyled
      style={touchableStyle}
      disabled={disabled || (!onPress && !onLongPress)}
      onPress={onPress}
      onLongPress={onLongPress}>
      {children ? (
        children
      ) : text ? (
        <TextStyled style={textStyle}>{text}</TextStyled>
      ) : (
        <></>
      )}
    </TouchableWithoutFeedbackStyled>
  );
};
const TouchableWithoutFeedbackStyled = styled(TouchableWithoutFeedback)`
  background: ${(props) => props.theme.colors.buttonBackground};
  padding: ${(props) => props.theme.spacing[2]}px;
  align-self: flex-start;
  border-radius: ${(props) => props.theme.borderRadius.button}px;
`;
const TextStyled = styled(Text)`
  color: ${(props) => props.theme.colors.buttonForeground};
`;
