import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Button, Text } from "react-native";
import { SIGN_OUT_MUTATION } from "../queries/SignOutMutation";
import { RootStackParams } from "../routes";
import { CURRENT_USER_QUERY } from "./User";

export default function SignOutButton(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "Home">
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

  return (
    <>
      <Button title="Sign out" onPress={onSignOut} />
      {error && (
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          We had an issue signing you out, please try again :(
        </Text>
      )}
    </>
  );
}
