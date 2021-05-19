import React from "react";
import styled, { useTheme } from "styled-components/native";
import CloseSvg from "../images/close.svg";

export const CloseIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}): JSX.Element => {
  const theme = useTheme();
  return (
    <CloseSvg
      width={width || 30}
      height={height || 30}
      fill={theme.colors.foreground}
    />
  );
};
export const CloseIconContainer = styled.View`
  position: absolute;
  z-index: 10;
  top: ${(props) => props.theme.spacing[1]}px;
  right: ${(props) => props.theme.spacing[1]}px;
`;
