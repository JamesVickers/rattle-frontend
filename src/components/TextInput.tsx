import React from "react";
import { ViewProps } from "react-native";
import {
  TextInput as RNTextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";
import { CloseIcon, CloseIconContainer } from "./CloseIcon";
import { Spacer } from "./Spacer";
import { Text } from "./Text";

export const TextInput = ({
  style,
  name,
  placeholder,
  value,
  secureTextEntry,
  isInvalid,
  isInvalidMessage,
  handleChange,
  clearValue,
}: {
  style?: ViewProps["style"];
  name: string;
  placeholder?: string;
  value: string;
  secureTextEntry?: boolean;
  isInvalid?: boolean;
  isInvalidMessage?: string;
  handleChange: (inputName: string, inputValue: string) => void;
  clearValue?: (property: string) => void;
}): JSX.Element => {
  const theme = useTheme();
  return (
    <TextInputContainer>
      <RNTextInputStyled
        style={style}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        isInvalid={isInvalid}
        autoCapitalize="none"
        onChangeText={(val) => handleChange(name, val)}
      />
      {value && clearValue ? (
        <CloseIconContainer>
          <TouchableOpacity
            onPress={() => clearValue(name)}
            activeOpacity={theme.opacity.pressed}>
            <CloseIcon />
          </TouchableOpacity>
        </CloseIconContainer>
      ) : (
        <></>
      )}
      {isInvalid && isInvalidMessage && (
        <>
          <Spacer height={1} />
          <Text colour="danger">{isInvalidMessage}</Text>
        </>
      )}
    </TextInputContainer>
  );
};
export const TextInputContainer = styled.View`
  width: 100%;
`;
export const RNTextInputStyled = styled(RNTextInput)<{ isInvalid?: boolean }>`
  color: ${(props) => props.theme.colors.foreground};
  background-color: ${(props) => props.theme.colors.input};
  border-radius: ${(props) => props.theme.borderRadius.input}px;
  height: ${(props) => props.theme.spacing[8]}px;
  padding: 0 ${(props) => props.theme.spacing[8]}px 0
    ${(props) => props.theme.spacing[2]}px;
  border-color: ${(props) => props.theme.colors.danger};
  border-width: ${({ isInvalid }) => (isInvalid ? 1 : 0)}px;
`;
