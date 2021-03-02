import React from "react";
import { TextInput as RNTextInput } from "react-native-gesture-handler";

export default function TextInput({
  name,
  placeholder,
  value,
  handleChange,
}: {
  name: string;
  placeholder?: string;
  value: string;
  handleChange: (inputName: string, inputValue: string) => void;
}): JSX.Element {
  return (
    <RNTextInput
      placeholder={placeholder}
      value={value}
      onChangeText={(val) => handleChange(name, val)}
    />
  );
}
