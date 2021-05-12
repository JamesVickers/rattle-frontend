import React, { useCallback } from "react";
import { Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { ChatTabsParams, RootStackParams } from "../routes";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { useUser } from "../components/User";
import { ToggleThemeSwitch } from "../components/ToggleThemeSwitch";
import { ProfileImage } from "../components/ProfileImage";
import { Outer } from "../components/Outer";

export const ProfileTab = (): JSX.Element => {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<RootStackParams, "ChatStack">,
      StackNavigationProp<ChatTabsParams, "Profile">
    >
  >();
  const user = useUser();

  const goToSignOutScreen = useCallback(() => {
    navigation.navigate("SignOut");
  }, [navigation]);

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Button title="Sign Out" onPress={goToSignOutScreen} />
        <ToggleThemeSwitch />
        <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
      </Outer>
    </SafeAreaViewDefault>
  );
};
