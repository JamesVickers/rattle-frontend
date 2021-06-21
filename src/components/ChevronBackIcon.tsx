import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components/native";
import ChevronBack from "../images/chevron-back.svg";
import { IconTouchableContainer } from "./IconTouchableContainer";

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
    <IconTouchableContainer
      style={style}
      disabled={disabled || !onPress}
      onPress={onPress}>
      <ChevronBack
        width={theme.spacing[6]}
        height={theme.spacing[6]}
        stroke={theme.colors.foreground}
        strokeWidth={theme.spacing[6]}
      />
    </IconTouchableContainer>
  );
};