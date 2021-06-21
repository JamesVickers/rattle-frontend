import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Text } from "../components/Text";
import { Outer } from "../components/Outer";
import { ChatTabsParams, RootStackParams } from "../routes";
import { ToggleThemeSwitch } from "../components/ToggleThemeSwitch";
import { Button } from "../components/Button";

export const SettingsTab = (): JSX.Element => {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<RootStackParams, "ChatStack">,
      StackNavigationProp<ChatTabsParams, "Settings">
    >
  >();

  const goToSignOutScreen = useCallback(() => {
    navigation.navigate("SignOut");
  }, [navigation]);

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>Settings</Text>
        <Button text="Sign Out" onPress={goToSignOutScreen} />
        <ToggleThemeSwitch />
      </Outer>
    </SafeAreaViewDefault>
  );
};
