import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { CloseIcon, CloseIconContainer } from "./CloseIcon";
import { RNTextInputStyled, TextInputContainer } from "./TextInput";

export const SearchBar = ({
  placeholder,
  searchString,
  setSearchString,
}: {
  placeholder?: string;
  searchString: string;
  setSearchString: (string: string) => void;
}): JSX.Element => {
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
            <CloseIcon />
          </TouchableOpacity>
        </CloseIconContainer>
      ) : (
        <></>
      )}
    </TextInputContainer>
  );
};
