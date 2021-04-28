import React from "react";
import styled from "styled-components/native";

export default function Spacer({
  width,
  height,
}: {
  width?: number;
  height?: number;
}): JSX.Element {
  return <ViewStyles width={width} height={height} />;
}
const ViewStyles = styled.View<{ width?: number; height?: number }>`
  width: ${(props) =>
    props.width ? `${props.theme.spacing[props.width]}px` : "100%"};
  height: ${(props) => props.theme.spacing[props.height || 1]}px;
`;
