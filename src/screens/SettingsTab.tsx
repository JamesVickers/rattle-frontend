// import {
//   CompositeNavigationProp,
//   useNavigation,
// } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Text } from "../components/Text";
import { Outer } from "../components/Outer";

export const SettingsTab = (): JSX.Element => {
  // const navigation = useNavigation<
  //   CompositeNavigationProp<
  //     StackNavigationProp<ChatTabsParams, "Settings">,
  //     StackNavigationProp<ChatStackParams>
  //   >
  // >();

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>Settings</Text>
      </Outer>
    </SafeAreaViewDefault>
  );
};
