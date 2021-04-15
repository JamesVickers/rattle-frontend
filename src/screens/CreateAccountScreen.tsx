import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Button } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { SIGN_UP_MUTATION } from "../queries/SignUpMutation";
import { RootStackParams } from "../routes";
import useForm from "../utils/useForm";

export default function CreateAccountScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "CreateAccount">
  >();

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
    <SafeAreaView
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}
      style={{ flex: 1 }}>
      <Text>Sign up for an account:</Text>
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
          <Text>Sign up successful with {data.createUser.email}</Text>
          <Text>You can now sign in to Rattle</Text>
          <Button title="Back to Sign In" onPress={goBackToSignInScreen} />
        </>
      )}
      {error && <Text>Sign up failed, please try again :(</Text>}
    </SafeAreaView>
  );
}
