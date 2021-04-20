import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Button, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { useTheme } from "styled-components/native";
import SignInForm from "../components/SignInForm";
import { RootStackParams } from "../routes";

export default function SignInScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "SignIn">
  >();
  const theme = useTheme();

  const onCreateAccount = useCallback(() => {
    navigation.navigate("CreateAccount");
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
      <SignInForm />
      <Button title="Create Account" onPress={onCreateAccount} />
      {/* <RequestPasswordReset /> */}
    </SafeAreaView>
  );
}
