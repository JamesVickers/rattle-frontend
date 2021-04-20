import React, { useCallback } from "react";
import { Button, StatusBar, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { useTheme } from "styled-components/native";
import ToggleThemeMode from "../components/ToggleThemeMode";
import { useUser } from "../components/User";
import ProfileImage from "../components/ProfileImage";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChatTabsParams, RootStackParams } from "../routes";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";

export default function ProfileTab(): JSX.Element {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<RootStackParams, "ChatTabs">,
      StackNavigationProp<ChatTabsParams, "Profile">
    >
  >();
  const theme = useTheme();
  const user = useUser();

  const goToSignOutScreen = useCallback(() => {
    navigation.navigate("SignOut");
  }, [navigation]);

  return (
    <SafeAreaView
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Button title="Sign Out" onPress={goToSignOutScreen} />
        <ToggleThemeMode />
        <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
      </View>
    </SafeAreaView>
  );
}
