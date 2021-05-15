import { useLazyQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import debounce from "lodash.debounce";
import { SearchBar } from "../components/SearchBar";
import { UserItem } from "../components/UserItem";
import { SEARCH_USERS_QUERY } from "../queries/SearchUsersQuery";
import { Text } from "../components/Text";
import { ErrorBox } from "../components/ErrorBox";
import { Spacer } from "../components/Spacer";
import { User } from "../state/user.model";

export const UserSearch = ({
  onSelectUser,
}: {
  onSelectUser?: (selectedUser: User) => void;
}): JSX.Element => {
  const [searchString, setSearchString] = useState("");
  const [debouncing, setDebouncing] = useState(false);

  const [findUsers, { data, loading, error }] = useLazyQuery(
    SEARCH_USERS_QUERY,
    { fetchPolicy: "no-cache" },
  );

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
        error={error}
        searchString={searchString}
        setSearchString={onChangeText}
      />
      {error && (
        <>
          <>
            <Spacer />
            <ErrorBox
              error={error}
              // clearError={clearError}
            />
            <Spacer />
          </>
        </>
      )}
      {searchString !== "" &&
        (loading || debouncing ? (
          <Text>Searching...</Text>
        ) : data ? (
          <FlatList
            data={data.allUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UserItem key={item.id} user={item} onSelectUser={onSelectUser} />
            )}
            ListEmptyComponent={<Text>No user matched found</Text>}
          />
        ) : (
          <></>
        ))}
    </>
  );
};
