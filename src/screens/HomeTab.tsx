import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Button, StatusBar, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { useUser } from "../components/User";
import { ChatTabsParams, RootStackParams } from "../routes";

export default function HomeTab(): JSX.Element {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<RootStackParams, "ChatTabs">,
      StackNavigationProp<ChatTabsParams, "Home">
    >
  >();
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
      style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View>
        {/* <ToggleThemeMode /> */}
        {/* <ToggleOpen /> */}
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>HomeTab :)</Text>
        <Button title="Sign Out" onPress={goToSignOutScreen} />
        <Button
          title="go to PostsScreen"
          onPress={() => {
            navigation.navigate("Posts");
          }}
        />
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {user && `Hi ${user.firstName}, you are logged in!!`}
        </Text>
      </View>
    </SafeAreaView>
  );
}
