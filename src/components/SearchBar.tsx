import { ApolloError } from "@apollo/client";
import React from "react";
import { TextInput, View, Text } from "react-native";
import { useTheme } from "styled-components/native";

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
      <Text style={{ color: theme.colors.foreground }}>Search for a post:</Text>
      <TextInput
        value={searchString}
        onChangeText={(string) => setSearchString(string)}
        placeholder={"Search"}
      />
      {error && (
        <Text style={{ color: theme.colors.foreground }}>
          Search failed, please try again :(
        </Text>
      )}
    </View>
  );
}
