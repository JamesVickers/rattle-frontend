import React from "react";
import { TextInput as RNTextInput } from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";

export default function TextInput({
  name,
  placeholder,
  value,
  secureTextEntry,
  handleChange,
}: {
  name: string;
  placeholder?: string;
  value: string;
  secureTextEntry?: boolean;
  handleChange: (inputName: string, inputValue: string) => void;
}): JSX.Element {
  const theme = useTheme();
  return (
    <RNTextInputStyles
      placeholder={placeholder}
      placeholderTextColor={theme.colors.foreground}
      value={value}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      onChangeText={(val) => handleChange(name, val)}
    />
  );
}
const RNTextInputStyles = styled(RNTextInput)`
  color: ${(props) => props.theme.colors.foreground};
  background-color: ${(props) => props.theme.colors.card};
`;
