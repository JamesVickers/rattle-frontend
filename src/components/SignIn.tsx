import { useMutation } from "@apollo/client";
import React, { useCallback } from "react";
import { Button, Text, View } from "react-native";
import { SIGN_IN_MUTATION } from "../gql/SignInMutation";
import useForm from "../utils/useForm";
import TextInput from "./TextInput";
import { CURRENT_USER_QUERY } from "./User";

export default function SignIn(): JSX.Element {
  const {
    inputs,
    handleChange,
    // clearForm,
    resetForm,
  } = useForm({
    email: "",
    password: "",
    // author: "JamesVickers",
  });

  const [
    signin,
    {
      //   loading,
      error,
    },
  ] = useMutation(SIGN_IN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const onSubmit = useCallback(async () => {
    // console.log(inputs);
    try {
      await signin();
      // console.log(resOnSubmit);
    } catch {
      // console.error(error);
    }
    resetForm();
  }, [resetForm, signin]);

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>Sign in to your account:</Text>
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
      <Button title="Sign in!" onPress={onSubmit} />
      {error && (
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Authentication failed, please try again :(
        </Text>
      )}
    </View>
  );
}
