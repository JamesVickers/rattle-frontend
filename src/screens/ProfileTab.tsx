import React, { useCallback } from "react";
import { Button, StatusBar, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { ChatTabsParams, RootStackParams } from "../routes";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { useUser } from "../components/User";
import ToggleThemeSwitch from "../components/ToggleThemeSwitch";
import ProfileImage from "../components/ProfileImage";

export default function ProfileTab(): JSX.Element {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<RootStackParams, "ChatTabs">,
      StackNavigationProp<ChatTabsParams, "Profile">
    >
  >();
  const user = useUser();

  const goToSignOutScreen = useCallback(() => {
    navigation.navigate("SignOut");
  }, [navigation]);

  return (
    <SafeAreaViewDefault>
      <StatusBar barStyle="dark-content" />
      <View>
        <Button title="Sign Out" onPress={goToSignOutScreen} />
        <ToggleThemeSwitch />
        <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
      </View>
    </SafeAreaViewDefault>
  );
}
