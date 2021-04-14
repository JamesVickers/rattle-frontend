import React from "react";
import styled from "styled-components/native";

export const Card = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  return <CardStyles>{children}</CardStyles>;
};
const CardStyles = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.card};
`;
