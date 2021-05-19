import React from "react";
import { useTheme } from "styled-components/native";
import CreateSvg from "../images/create.svg";

export const CreateIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}): JSX.Element => {
  const theme = useTheme();
  return (
    <CreateSvg
      width={width || 30}
      height={height || 30}
      fill={theme.colors.foreground}
      stroke={theme.colors.danger}
      strokeWidth={20}
    />
  );
};
