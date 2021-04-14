import React from "react";
import { StatusBar, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import ToggleThemeMode from "../components/ToggleThemeMode";
import { useUser } from "../components/User";
import ProfileImage from "../components/ProfileImage";

export default function ProfileTab(): JSX.Element {
  const user = useUser();

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
        <ToggleThemeMode />
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>ProfileTab :)</Text>
        <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
      </View>
    </SafeAreaView>
  );
}
