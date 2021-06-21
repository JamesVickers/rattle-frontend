import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components/native";
import EllipsisSvg from "../images/ellipsis.svg";
import { IconTouchableContainer } from "./IconTouchableContainer";

export const EllipsisIcon = ({
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
      <EllipsisSvg
        width={theme.spacing[6]}
        height={theme.spacing[6]}
        fill={theme.colors.icon}
      />
    </IconTouchableContainer>
  );
};
