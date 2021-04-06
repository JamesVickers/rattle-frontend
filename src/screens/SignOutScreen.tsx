import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Button, Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { CURRENT_USER_QUERY } from "../components/User";
import { SIGN_OUT_MUTATION } from "../queries/SignOutMutation";
import { RootStackParams } from "../routes";

export default function SignOutScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "SignOut">
  >();

  const [
    signout,
    {
      //   loading,
      error,
    },
  ] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const onSignOut = useCallback(async () => {
    // console.log(inputs);
    try {
      await signout();
      navigation.navigate("Splash");
      // console.log(resOnSubmit);
    } catch {
      // console.error(error);
    }
  }, [navigation, signout]);

  const onCancel = useCallback(() => {
    navigation.goBack();
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
      <Button title="Sign out" onPress={onSignOut} />
      <Button title="Cancel" onPress={onCancel} />
      {error && (
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          We had an issue signing you out, please try again :(
        </Text>
      )}
    </SafeAreaView>
  );
}
