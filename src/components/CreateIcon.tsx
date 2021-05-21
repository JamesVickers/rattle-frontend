import React from "react";
import { useTheme } from "styled-components/native";
import CreateSvg from "../images/create.svg";
import { IconCircleBackground } from "./IconCircleBackground";

export const CreateIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}): JSX.Element => {
  const theme = useTheme();
  return (
    <IconCircleBackground
      style={{
        alignSelf: "flex-start",
      }}>
      <CreateSvg
        width={width || 40}
        height={height || 40}
        fill={theme.colors.foreground}
        stroke={theme.colors.foreground}
        strokeWidth={10}
      />
    </IconCircleBackground>
  );
};
