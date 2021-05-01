import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { CURRENT_USER_QUERY } from "../queries/CurrentUserQuery";
import { SIGN_IN_MUTATION } from "../queries/SignInMutation";
import { RootStackParams } from "../routes";
import useForm from "../utils/useForm";
import Button from "./Button";
import Spacer from "./Spacer";
import Text from "./Text";
import TextInput from "./TextInput";
import { useUser } from "./User";

export default function SignInForm({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "SignIn">
  >();

  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
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
      navigation.replace("ChatStack");
    }
  }, [user, navigation]);

  const onSubmit = useCallback(async () => {
    try {
      await signin();
    } catch {
      console.error(error);
    }
    resetForm();
  }, [error, resetForm, signin]);

  return (
    <FormStyles style={style}>
      <Spacer />
      <Text>Sign in to your account</Text>
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
      <Button text="Sign in!" onPress={onSubmit} />
      {error && (
        <>
          <Spacer />
          <Text colour="danger">
            Authentication failed, please try again :(
          </Text>
        </>
      )}
    </FormStyles>
  );
}
const FormStyles = styled(View)`
  width: 100%;
  align-items: center;
`;
