import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Button } from "react-native";
import { useTheme } from "styled-components/native";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import TextInput from "../components/TextInput";
import { TextStyles } from "../components/TextStyles";
import { SIGN_UP_MUTATION } from "../queries/SignUpMutation";
import { RootStackParams } from "../routes";
import useForm from "../utils/useForm";

export default function CreateAccountScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "CreateAccount">
  >();
  const theme = useTheme();

  const {
    inputs,
    handleChange,
    // clearForm,
    resetForm,
  } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // author: "JamesVickers",
  });

  const [
    signup,
    {
      data,
      // loading,
      error,
    },
  ] = useMutation(SIGN_UP_MUTATION, {
    variables: inputs,
  });

  const onSignUp = useCallback(async () => {
    try {
      await signup();
    } catch {
      console.error(error);
    }
    resetForm();
  }, [error, resetForm, signup]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goBackToSignInScreen = useCallback(() => {
    navigation.navigate("SignIn");
  }, [navigation]);

  return (
    <SafeAreaViewDefault>
      <TextStyles>Sign up for an account:</TextStyles>
      <TextInput
        value={inputs.firstName}
        handleChange={handleChange}
        name={"firstName"}
        placeholder={"First Name"}
      />
      <TextInput
        value={inputs.lastName}
        handleChange={handleChange}
        name={"lastName"}
        placeholder={"Last Name"}
      />
      <TextInput
        value={inputs.email}
        handleChange={handleChange}
        name={"email"}
        placeholder={"Email"}
      />
      <TextInput
        secureTextEntry
        value={inputs.password}
        handleChange={handleChange}
        name={"password"}
        placeholder={"Password"}
      />
      <Button title="Sign up!" onPress={onSignUp} />
      <Button title="Cancel" onPress={onCancel} />
      {data?.createUser && (
        <>
          <TextStyles style={{ color: theme.colors.foreground }}>
            Sign up successful with {data.createUser.email}
          </TextStyles>
          <TextStyles style={{ color: theme.colors.foreground }}>
            You can now sign in to Rattle
          </TextStyles>
          <Button title="Back to Sign In" onPress={goBackToSignInScreen} />
        </>
      )}
      {error && (
        <TextStyles style={{ color: theme.colors.foreground }}>
          Sign up failed, please try again :(
        </TextStyles>
      )}
    </SafeAreaViewDefault>
  );
}
