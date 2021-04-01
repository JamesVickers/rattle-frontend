import { useMutation } from "@apollo/client";
import React, { useCallback } from "react";
import { Button, Text, View } from "react-native";
import { SIGN_UP_MUTATION } from "../queries/SignUpMutation";
import useForm from "../utils/useForm";
import TextInput from "./TextInput";

export default function SignUp(): JSX.Element {
  const {
    inputs,
    handleChange,
    // clearForm,
    resetForm,
  } = useForm({
    name: "",
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

  const onSubmit = useCallback(async () => {
    // console.log(inputs);
    try {
      await signup();
      // console.log(resOnSubmit);
    } catch {
      // console.error(error);
    }
    resetForm();
  }, [resetForm, signup]);

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>Sign up for an account:</Text>
      <TextInput
        value={inputs.name}
        handleChange={handleChange}
        name={"name"}
        placeholder={"Name"}
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
      <Button title="Sign up!" onPress={onSubmit} />
      {data?.createUser && (
        <>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Sign up successful with {data.createUser.email}
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            You can now sign in to Rattle
          </Text>
        </>
      )}
      {error && (
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Sign up failed, please try again :(
        </Text>
      )}
    </View>
  );
}
