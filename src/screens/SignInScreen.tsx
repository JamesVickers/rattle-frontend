import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Button, StatusBar } from "react-native";
import { RootStackParams } from "../routes";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import SignInForm from "../components/SignInForm";

export default function SignInScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "SignIn">
  >();

  const onCreateAccount = useCallback(() => {
    navigation.navigate("CreateAccount");
  }, [navigation]);

  return (
    <SafeAreaViewDefault>
      <Outer style={{ flex: 1, margin: "5%" }}>
        <StatusBar barStyle="dark-content" />
        <SignInForm />
        <Button title="Create Account" onPress={onCreateAccount} />
        {/* <RequestPasswordReset /> */}
      </Outer>
    </SafeAreaViewDefault>
  );
}
