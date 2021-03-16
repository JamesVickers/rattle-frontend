import { ApolloError } from "@apollo/client";
import React from "react";
import { Text, TextInput, View } from "react-native";

export default function Searchbar({
  error,
  searchTerm,
  setSearchTerm,
}: {
  error?: ApolloError | undefined;
  searchTerm: string;
  setSearchTerm: (newText: string) => void;
}): JSX.Element {
  // const onSearch = useCallback(async () => {
  //   try {
  //     await findUsers();
  //   } catch {
  //     console.error(error);
  //   }
  // }, [error, findUsers]);

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>Search for a post:</Text>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
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
