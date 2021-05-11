import React from "react";
import { ViewProps } from "react-native";
import {
  TextInput as RNTextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";
import CloseSvg from "../images/close.svg";

export default function TextInput({
  style,
  name,
  placeholder,
  value,
  secureTextEntry,
  isInvalid,
  handleChange,
  clearValue,
}: {
  style?: ViewProps["style"];
  name: string;
  placeholder?: string;
  value: string;
  secureTextEntry?: boolean;
  isInvalid?: boolean;
  handleChange: (inputName: string, inputValue: string) => void;
  clearValue?: (property: string) => void;
}): JSX.Element {
  const theme = useTheme();
  return (
    <TextInputContainer>
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
      {value && clearValue ? (
        <CloseIconContainer>
          <TouchableOpacity
            onPress={() => clearValue(name)}
            activeOpacity={theme.opacity.pressed}>
            <CloseSvg width={30} height={30} fill={theme.colors.foreground} />
          </TouchableOpacity>
        </CloseIconContainer>
      ) : (
        <></>
      )}
    </TextInputContainer>
  );
}
const TextInputContainer = styled.View`
  width: 100%;
`;
const RNTextInputStyled = styled(RNTextInput)<{ isInvalid?: boolean }>`
  color: ${(props) => props.theme.colors.foreground};
  background-color: ${(props) => props.theme.colors.input};
  border-radius: ${(props) => props.theme.borderRadius.input}px;
  height: ${(props) => props.theme.spacing[8]}px;
  padding: 0 ${(props) => props.theme.spacing[8]}px 0
    ${(props) => props.theme.spacing[2]}px;
  border-color: ${(props) => props.theme.colors.danger};
  border-width: ${({ isInvalid }) => (isInvalid ? 1 : 0)}px;
`;
export const CloseIconContainer = styled.View`
  position: absolute;
  z-index: 10;
  top: ${(props) => props.theme.spacing[1]}px;
  right: ${(props) => props.theme.spacing[1]}px;
`;
