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
import TextInput from "./TextInput";
import { TextStyles } from "./TextStyles";
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
      navigation.replace("ChatTabs");
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
      <Spacer height={4} />
      <TextStyles>Sign in to your account:</TextStyles>
      <Spacer height={4} />
      <TextInput
        value={inputs.email}
        handleChange={handleChange}
        name={"email"}
        placeholder={"Email"}
      />
      <Spacer height={4} />
      <TextInput
        secureTextEntry
        value={inputs.password}
        handleChange={handleChange}
        name={"password"}
        placeholder={"Password"}
      />
      <Spacer height={4} />
      <Button text="Sign in!" onPress={onSubmit} />
      {error && (
        <>
          <Spacer height={4} />
          <TextStyles>Authentication failed, please try again :(</TextStyles>
        </>
      )}
    </FormStyles>
  );
}
const FormStyles = styled(View)`
  align-items: center;
`;
