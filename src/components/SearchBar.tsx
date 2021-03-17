import { ApolloError } from "@apollo/client";
import React from "react";
import { Text, TextInput, View } from "react-native";

export default function Searchbar({
  error,
  searchString,
  setSearchString,
}: {
  error?: ApolloError | undefined;
  searchString: string;
  setSearchString: (string: string) => void;
}): JSX.Element {
  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>Search for a post:</Text>
      <TextInput
        value={searchString}
        onChangeText={(string) => setSearchString(string)}
        placeholder={"Search"}
      />
      {/* <Button title="Search" onPress={onSearch} /> */}
      {error && (
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Search failed, please try again :(
        </Text>
      )}
    </View>
  );
}
