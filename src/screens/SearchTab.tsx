import { useLazyQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import debounce from "lodash.debounce";
import SearchBar from "../components/SearchBar";
import UserItem from "../components/UserItem";
import { SEARCH_USERS_QUERY } from "../queries/SearchUsersQuery";

export default function SearchTab(): JSX.Element {
  const [searchString, setSearchString] = useState("");
  const [debouncing, setDebouncing] = useState(false);

  const [
    findUsers,
    { data: findUsersData, loading: findUsersLoading, error: findUsersError },
  ] = useLazyQuery(SEARCH_USERS_QUERY, { fetchPolicy: "no-cache" });

  const debounceAndFindUsers = useCallback(
    debounce((searchTerm: string) => {
      findUsers({
        variables: { searchTerm },
      });
      setDebouncing(false);
    }, 400),
    [],
  );

  const onChangeText = useCallback(
    (text: string) => {
      setSearchString(text);
      setDebouncing(true);
      debounceAndFindUsers(text);
    },
    [debounceAndFindUsers],
  );

  return (
    <SafeAreaView
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}
      style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>SearchTab :)</Text>
        <SearchBar
          error={findUsersError}
          searchString={searchString}
          setSearchString={onChangeText}
        />
        {searchString !== "" &&
          (findUsersLoading || debouncing ? (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              Searching...
            </Text>
          ) : findUsersData ? (
            <FlatList
              data={findUsersData.allUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <UserItem key={item.id} user={item} />}
              ListEmptyComponent={<Text>No user matched found</Text>}
            />
          ) : (
            <></>
          ))}
      </View>
    </SafeAreaView>
  );
}
