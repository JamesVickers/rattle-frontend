import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { StatusBar, View } from "react-native";
import { RootStackParams } from "../routes";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import SignInForm from "../components/SignInForm";
import Button from "../components/Button";
import Spacer from "../components/Spacer";

export default function SignInScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "SignIn">
  >();

  const onCreateAccount = useCallback(() => {
    navigation.navigate("CreateAccount");
  }, [navigation]);

  return (
    <SafeAreaViewDefault>
      <Outer>
        <StatusBar barStyle="dark-content" />
        <SignInForm />
        <Spacer />
        <View style={{ alignItems: "center" }}>
          <Button text="Create Account" onPress={onCreateAccount} />
        </View>
        {/* <RequestPasswordReset /> */}
      </Outer>
    </SafeAreaViewDefault>
  );
}
