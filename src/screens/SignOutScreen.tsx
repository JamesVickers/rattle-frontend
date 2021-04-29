import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { useTheme } from "styled-components/native";
import Button from "../components/Button";
import { Outer } from "../components/Outer";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import Spacer from "../components/Spacer";
import Text from "../components/Text";
import { CURRENT_USER_QUERY } from "../queries/CurrentUserQuery";
import { SIGN_OUT_MUTATION } from "../queries/SignOutMutation";
import { RootStackParams } from "../routes";

export default function SignOutScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "SignOut">
  >();
  const theme = useTheme();

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
      <Outer style={{ alignItems: "center" }}>
        <Button
          text="Sign out"
          touchableStyle={{ backgroundColor: theme.colors.danger }}
          onPress={onSignOut}
        />
        <Spacer />
        <Button text="Cancel" onPress={onCancel} />
        {error && (
          <>
            <Spacer />
            <Text>We had an issue signing you out, please try again :(</Text>
          </>
        )}
      </Outer>
    </SafeAreaViewDefault>
  );
}
