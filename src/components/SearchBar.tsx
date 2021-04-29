import { ApolloError } from "@apollo/client";
import React from "react";
import { TextInput, View } from "react-native";
import { useTheme } from "styled-components/native";
import Text from "./Text";

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
      <Text>Search for a user</Text>
      <TextInput
        value={searchString}
        onChangeText={(string) => setSearchString(string)}
        placeholder={"Search"}
      />
      {error && <Text>Search failed, please try again :(</Text>}
    </View>
  );
}
