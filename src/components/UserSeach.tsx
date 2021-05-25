import { useLazyQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import debounce from "lodash.debounce";
import { SearchBar } from "../components/SearchBar";
import { UserItem } from "../components/UserItem";
import { SEARCH_USERS_QUERY } from "../queries/SearchUsersQuery";
import { Text } from "../components/Text";
import { ErrorBox } from "../components/ErrorBox";
import { Spacer } from "../components/Spacer";
import { User } from "../state/user.model";
import { ActivityIndicator } from "react-native";
import { useError } from "../utils/useError";

export const UserSearch = ({
  onSelectUser,
}: {
  onSelectUser?: (selectedUser: User) => void;
}): JSX.Element => {
  const theme = useTheme();

  const [searchString, setSearchString] = useState("");
  const [debouncing, setDebouncing] = useState(false);

  const { error, handleError, clearError } = useError();

  const [
    findUsers,
    {
      data: searchUsersData,
      loading: searchUsersLoading,
      error: searchUsersError,
    },
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
    <>
      <SearchBar
        placeholder={"Search for a User"}
        searchString={searchString}
        setSearchString={onChangeText}
      />
      {error && (
        <>
          <>
            <Spacer />
            <ErrorBox error={error} clearError={clearError} />
            <Spacer />
          </>
        </>
      )}
      {searchString !== "" &&
        (searchUsersLoading || debouncing ? (
          <>
            <Spacer />
            <ActivityIndicator color={theme.colors.foreground} size="large" />
          </>
        ) : searchUsersData ? (
          <FlatList
            data={searchUsersData.allUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UserItem key={item.id} user={item} onSelectUser={onSelectUser} />
            )}
            ListEmptyComponent={<Text>No user match found</Text>}
          />
        ) : (
          <></>
        ))}
    </>
  );
};
