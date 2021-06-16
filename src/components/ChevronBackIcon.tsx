import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useTheme } from "styled-components/native";
import ChevronBack from "../images/chevron-back.svg";

export const ChevronBackIcon = ({
  style,
  disabled,
  onPress,
}: {
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
}): JSX.Element => {
  const theme = useTheme();
  return (
    <TouchableOpacityStyled
      style={style}
      disabled={disabled || !onPress}
      onPress={onPress}>
      <ChevronBack
        width={theme.spacing[6]}
        height={theme.spacing[6]}
        stroke={theme.colors.foreground}
        strokeWidth={theme.spacing[6]}
      />
    </TouchableOpacityStyled>
  );
};
const TouchableOpacityStyled = styled(TouchableOpacity)`
  background: tomato;
  padding: ${(props) => props.theme.spacing[1]}px;
  align-self: flex-start;
`;
