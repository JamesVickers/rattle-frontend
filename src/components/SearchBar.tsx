import { ApolloError } from "@apollo/client";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import CloseSvg from "../images/close.svg";
import {
  CloseIconContainer,
  RNTextInputStyled,
  TextInputContainer,
} from "./TextInput";

export default function Searchbar({
  placeholder,
  error,
  searchString,
  setSearchString,
}: {
  placeholder?: string;
  error?: ApolloError | undefined;
  searchString: string;
  setSearchString: (string: string) => void;
}): JSX.Element {
  const theme = useTheme();
  return (
    <TextInputContainer>
      <RNTextInputStyled
        value={searchString}
        onChangeText={(string) => setSearchString(string)}
        placeholder={placeholder || "Search"}
        placeholderTextColor={theme.colors.placeholder}
      />
      {searchString ? (
        <CloseIconContainer>
          <TouchableOpacity
            onPress={() => setSearchString("")}
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
