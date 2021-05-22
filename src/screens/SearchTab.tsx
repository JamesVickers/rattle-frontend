import React from "react";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import { UserSearch } from "../components/UserSeach";
import { Text } from "../components/Text";

export const SearchTab = (): JSX.Element => {
  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>Search</Text>
        <UserSearch />
      </Outer>
    </SafeAreaViewDefault>
  );
};
