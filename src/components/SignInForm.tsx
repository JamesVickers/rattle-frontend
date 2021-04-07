import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { SIGN_IN_MUTATION } from "../queries/SignInMutation";
import { RootStackParams } from "../routes";
import useForm from "../utils/useForm";
import TextInput from "./TextInput";
import { CURRENT_USER_QUERY, useUser } from "./User";

export default function SignInForm(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "SignIn">
  >();

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

  const user = useUser();

  useEffect(() => {
    if (user) {
      navigation.replace("ChatTabs");
    }
  }, [user, navigation]);

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
