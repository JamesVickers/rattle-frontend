import React from "react";
import { TextInput as RNTextInput } from "react-native-gesture-handler";

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
  return (
    <RNTextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      onChangeText={(val) => handleChange(name, val)}
    />
  );
}
