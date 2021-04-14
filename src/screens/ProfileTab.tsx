import React from "react";
import { StatusBar, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import ToggleThemeMode from "../components/ToggleThemeMode";

export default function ProfileTab(): JSX.Element {
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
      </View>
    </SafeAreaView>
  );
}
