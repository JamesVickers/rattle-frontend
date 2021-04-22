import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Button } from "react-native";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { TextStyles } from "../components/TextStyles";
import { CURRENT_USER_QUERY } from "../queries/CurrentUserQuery";
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
    try {
      await signout();
      navigation.navigate("Splash");
    } catch {
      console.error(error);
    }
  }, [error, navigation, signout]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaViewDefault>
      <Button title="Sign out" onPress={onSignOut} />
      <Button title="Cancel" onPress={onCancel} />
      {error && (
        <TextStyles>
          We had an issue signing you out, please try again :(
        </TextStyles>
      )}
    </SafeAreaViewDefault>
  );
}
