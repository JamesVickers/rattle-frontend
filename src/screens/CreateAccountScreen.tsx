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
import TextInput from "../components/TextInput";
import { SIGN_UP_MUTATION } from "../queries/SignUpMutation";
import { RootStackParams } from "../routes";
import { useForm } from "../utils/useForm";

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
    // TODO: add correct form validation to check is all individual fields are valid
    if (
      inputs.firstName !== "" &&
      inputs.lastName !== "" &&
      inputs.email !== "" &&
      inputs.password !== ""
    ) {
      try {
        await signup();
      } catch {
        console.error(error);
      }
    }
    resetForm();
  }, [
    error,
    inputs.email,
    inputs.firstName,
    inputs.lastName,
    inputs.password,
    resetForm,
    signup,
  ]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goBackToSignInScreen = useCallback(() => {
    navigation.navigate("SignIn");
  }, [navigation]);

  return (
    <SafeAreaViewDefault>
      <Outer style={{ alignItems: "center" }}>
        <Text>Create an account</Text>
        <Spacer />
        <TextInput
          value={inputs.firstName}
          handleChange={handleChange}
          name={"firstName"}
          placeholder={"First Name"}
        />
        <Spacer />
        <TextInput
          value={inputs.lastName}
          handleChange={handleChange}
          name={"lastName"}
          placeholder={"Last Name"}
        />
        <Spacer />
        <TextInput
          value={inputs.email}
          handleChange={handleChange}
          name={"email"}
          placeholder={"Email"}
        />
        <Spacer />
        <TextInput
          secureTextEntry
          value={inputs.password}
          handleChange={handleChange}
          name={"password"}
          placeholder={"Password"}
        />
        <Spacer />
        <Button text="Sign up!" onPress={onSignUp} />
        <Spacer />
        <Button text="Cancel" onPress={onCancel} />
        {data?.createUser && (
          <>
            <Spacer />
            <Text>Sign up successful with {data.createUser.email}</Text>
            <Text>You can now sign in to Rattle</Text>
            <Spacer />
            <Button text="Back to Sign In" onPress={goBackToSignInScreen} />
          </>
        )}
        {error && (
          <>
            <Spacer />
            <Text style={{ color: theme.colors.foreground }}>
              Sign up failed, please try again: (
            </Text>
          </>
        )}
      </Outer>
    </SafeAreaViewDefault>
  );
}
