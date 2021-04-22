import { ApolloError } from "@apollo/client";
import React from "react";
import { TextInput, View } from "react-native";
import { useTheme } from "styled-components/native";
import { TextStyles } from "./TextStyles";

export default function Searchbar({
  error,
  searchString,
  setSearchString,
}: {
  error?: ApolloError | undefined;
  searchString: string;
  setSearchString: (string: string) => void;
}): JSX.Element {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.card }}>
      <TextStyles>Search for a post:</TextStyles>
      <TextInput
        value={searchString}
        onChangeText={(string) => setSearchString(string)}
        placeholder={"Search"}
      />
      {error && <TextStyles>Search failed, please try again :(</TextStyles>}
    </View>
  );
}
