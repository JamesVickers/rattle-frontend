import { useLazyQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SEARCH_USERS_QUERY } from "../gql/SearchUsersQuery";

export default function Searchbar(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const [
    findUsers,
    {
      data,
      // loading,
      error,
    },
  ] = useLazyQuery(SEARCH_USERS_QUERY, {
    variables: { searchTerm },
    fetchPolicy: "no-cache",
  });

  console.log("search data: ", data);

  const onSearch = useCallback(async () => {
    try {
      await findUsers();
    } catch {
      console.error(error);
    }
  }, [error, findUsers]);

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>Search for a post:</Text>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={"Search"}
      />
      <Button title="Search" onPress={onSearch} />
      {error && (
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Search failed, please try again :(
        </Text>
      )}
    </View>
  );
}
