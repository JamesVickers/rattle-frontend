import React from "react";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import { UserSearch } from "../components/UserSeach";

export const SearchTab = (): JSX.Element => {
  return (
    <SafeAreaViewDefault>
      <Outer>
        <UserSearch />
      </Outer>
    </SafeAreaViewDefault>
  );
};
