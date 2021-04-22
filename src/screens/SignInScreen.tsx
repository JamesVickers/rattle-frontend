import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Button, StatusBar } from "react-native";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import SignInForm from "../components/SignInForm";
import { RootStackParams } from "../routes";

export default function SignInScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "SignIn">
  >();

  const onCreateAccount = useCallback(() => {
    navigation.navigate("CreateAccount");
  }, [navigation]);

  return (
    <SafeAreaViewDefault>
      <StatusBar barStyle="dark-content" />
      <SignInForm />
      <Button title="Create Account" onPress={onCreateAccount} />
      {/* <RequestPasswordReset /> */}
    </SafeAreaViewDefault>
  );
}
