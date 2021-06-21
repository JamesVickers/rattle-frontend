import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const IconTouchableContainer = ({
  style,
  children,
  disabled,
  onPress,
}: {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
}): JSX.Element => {
  return (
    <TouchableOpacityStyled
      style={style}
      disabled={disabled || !onPress}
      onPress={onPress}>
      {children}
    </TouchableOpacityStyled>
  );
};
const TouchableOpacityStyled = styled(TouchableOpacity)`
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing[1]}px;
`;
