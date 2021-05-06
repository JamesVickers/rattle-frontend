import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "styled-components/native";
import { CURRENT_USER_QUERY } from "../queries/CurrentUserQuery";
import { SIGN_IN_MUTATION } from "../queries/SignInMutation";
import { RootStackParams } from "../routes";
import { useError } from "../utils/useError";
import { useForm } from "../utils/useForm";
import Button from "./Button";
import ErrorBox from "./ErrorBox";
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
  const theme = useTheme();

  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const { error, handleError, clearError } = useError();

  const [signin, { loading, error: signInError }] = useMutation(
    SIGN_IN_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  useEffect(() => {
    // if graphql error changes, update useError hook
    handleError(signInError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInError]);

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
      handleError(signInError);
    }
    resetForm();
  }, [resetForm, signin, handleError, signInError]);

  return (
    <FormStyled style={style}>
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
      {error && (
        <>
          <ErrorBox error={error} clearError={clearError} />
          <Spacer />
        </>
      )}
      {!loading ? (
        <Button text="Sign in!" onPress={onSubmit} />
      ) : (
        <>
          <Spacer />
          <ActivityIndicator color={theme.colors.foreground} size="large" />
        </>
      )}
    </FormStyled>
  );
}
const FormStyled = styled(View)`
  width: 100%;
  align-items: center;
`;
