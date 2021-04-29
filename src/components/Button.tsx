import React from "react";
import { StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styled from "styled-components/native";

export default function Button({
  touchableStyle,
  textStyle,
  text,
  disabled,
  onPress,
  onLongPress,
}: {
  touchableStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}): JSX.Element {
  return (
    <TouchableWithoutFeedbackStyles
      style={touchableStyle}
      disabled={disabled || (!onPress && !onLongPress)}
      onPress={onPress}
      onLongPress={onLongPress}>
      <TextStyles style={textStyle}>{text}</TextStyles>
    </TouchableWithoutFeedbackStyles>
  );
}
const TouchableWithoutFeedbackStyles = styled(TouchableWithoutFeedback)`
  background: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacing[2]}px;
  align-self: flex-start;
  border-radius: ${(props) => props.theme.borderRadius.button}px;
`;
const TextStyles = styled(Text)`
  color: ${(props) => props.theme.colors.foreground};
`;
