import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const ItemTopSeparator = styled.View`
  border-top-width: ${() => StyleSheet.hairlineWidth}px;
  border-color: ${(props) => props.theme.colors.background};
`;
export const ItemLeftSeparator = styled.View`
  margin: 0 ${(props) => props.theme.spacing[2]}px;
  border-left-width: ${() => StyleSheet.hairlineWidth}px;
  border-color: ${(props) => props.theme.colors.background};
`;
