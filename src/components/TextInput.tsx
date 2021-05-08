import React from "react";
import { ViewProps } from "react-native";
import { TextInput as RNTextInput } from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";

export default function TextInput({
  style,
  name,
  placeholder,
  value,
  secureTextEntry,
  isInvalid,
  handleChange,
}: {
  style?: ViewProps["style"];
  name: string;
  placeholder?: string;
  value: string;
  secureTextEntry?: boolean;
  isInvalid?: boolean;
  handleChange: (inputName: string, inputValue: string) => void;
}): JSX.Element {
  const theme = useTheme();
  return (
    <RNTextInputStyled
      style={style}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.foreground}
      value={value}
      secureTextEntry={secureTextEntry}
      isInvalid={isInvalid}
      autoCapitalize="none"
      onChangeText={(val) => handleChange(name, val)}
    />
  );
}
const RNTextInputStyled = styled(RNTextInput)<{ isInvalid?: boolean }>`
  color: ${(props) => props.theme.colors.foreground};
  background-color: ${(props) => props.theme.colors.input};
  border-radius: ${(props) => props.theme.borderRadius.input}px;
  width: 100%;
  height: ${(props) => props.theme.spacing[8]}px;
  padding: 0 ${(props) => props.theme.spacing[2]}px;
  border-color: ${(props) => props.theme.colors.danger};
  border-width: ${({ isInvalid }) => (isInvalid ? 1 : 0)}px;
`;
